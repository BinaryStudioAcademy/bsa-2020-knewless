package fileprocessor.videoencoder;

import fileprocessor.lecture.LectureRepository;
import fileprocessor.lecture.model.Lecture;
import fileprocessor.messaging.MessageSender;
import fileprocessor.messaging.notification.UserMessage;
import fileprocessor.messaging.notification.UserMessageType;
import fileprocessor.notification.NotificationService;
import fileprocessor.notification.dto.NotificationDto;
import fileprocessor.notification.model.Notification;
import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFmpegUtils;
import net.bramp.ffmpeg.FFprobe;
import net.bramp.ffmpeg.builder.FFmpegBuilder;
import net.bramp.ffmpeg.probe.FFmpegProbeResult;
import net.bramp.ffmpeg.probe.FFmpegStream;
import net.bramp.ffmpeg.progress.Progress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class VideoEncoderService {
	private final int FULL_HD_WIDTH = 1920;
	private final int FULL_HD_HEIGHT = 1080;
	private final int HD_WIDTH = 1280;
	private final int HD_HEIGHT = 720;
	private final int SMALL_WIDTH = 720;
	private final int SMALL_HEIGHT = 480;
	
	@Autowired
	private MessageSender messageSender;
	@Autowired
	private LectureRepository lectureRepository;
	@Autowired
	private NotificationService notificationService;
	@Autowired
	private FFprobe ffprobe;
	@Autowired
	private FFmpegExecutor fFmpegExecutor;
	@Value("${fs.root}")
	private String rootPath;
	
	private FFmpegProbeResult inputVideo;
	
	@Async
	public void encode(String id, UUID entityId, UUID userId) throws IOException {
		log.info("Started encoding lecture {}", entityId);
		Lecture lecture = lectureRepository.findById(entityId).orElseThrow();
		String baseFilePath = rootPath + "/video/" + id + "/" + id;
		String path = "assets/video/" + id + "/" + id;
		inputVideo = ffprobe.probe(baseFilePath + "-origin.mp4");
		String thumbnail = getThumbnail(id);
		FFmpegStream videoInfo = inputVideo.getStreams().get(0);
		updateOrigin(path + "-origin.mp4", entityId, thumbnail);
		CompletableFuture<Void> finished480 = process480(path + "-480.mp4", entityId, baseFilePath, videoInfo.width);
		CompletableFuture<Void> finished720 = process720(path + "-720.mp4", entityId, baseFilePath, videoInfo.width);
		CompletableFuture<Void> finished1080 = process1080(path + "-1080.mp4", entityId, baseFilePath, videoInfo.width);
		
		CompletableFuture.allOf(finished480, finished720, finished1080).join();
		log.info("Finished encoding lecture {}, sending notification...", entityId);
		Notification notification = notificationService.saveLectureNotification(lecture.getId(), lecture.getName(), userId);
		sendResponse(notification, userId);
		log.info("Notification for lecture {} sent", entityId);
	}
	
	void updateOrigin(String sourceId, UUID lectureId, String thumbnail) {
		log.info("Updating origin and thumbnail for lecture {}...", lectureId);
		Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();
		lecture.setUrlOrigin(sourceId);
		lecture.setPreviewImage(thumbnail);
		lecture.setDuration((int) (inputVideo.getFormat().duration));
		lectureRepository.save(lecture);
		log.info("Updated origin and thumbnail for lecture {}", lectureId);
	}
	
	CompletableFuture<Void> process1080(String generatedVideoPath, UUID lectureId, String baseFilePath, int videoWidth) {
		return CompletableFuture.runAsync(() -> {
			if (videoWidth >= FULL_HD_WIDTH) {
				log.info("Creating 1080p for lecture {}...", lectureId);
				fFmpegExecutor.createJob(getBuilder(
						baseFilePath + "-1080.mp4", FULL_HD_WIDTH, FULL_HD_HEIGHT),
						progress -> loggerProgressWhileEncoding(progress, lectureId.toString(), "1080p")
				).run();
				Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();
				lecture.setUrl1080(generatedVideoPath);
				lectureRepository.save(lecture);
				log.info("Created 1080p for lecture {}", lectureId);
			} else {
				log.info("Skipping 1080p, as video width is {}", videoWidth);
			}
		});
	}
	
	CompletableFuture<Void> process720(String sourceId, UUID lectureId, String baseFilePath, int videoWidth) {
		return CompletableFuture.runAsync(() -> {
			if (videoWidth >= HD_WIDTH) {
				log.info("Creating 720p for lecture {}...", lectureId);
				fFmpegExecutor.createJob(getBuilder(
						baseFilePath + "-720.mp4", HD_WIDTH, HD_HEIGHT),
						progress -> loggerProgressWhileEncoding(progress, lectureId.toString(), "720p")
				).run();
				Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();
				lecture.setUrl720(sourceId);
				lectureRepository.save(lecture);
				log.info("Created 720p for lecture {}", lectureId);
			} else {
				log.info("Skipping 720p, as video width is {}", videoWidth);
			}
		});
	}
	
	CompletableFuture<Void> process480(String sourceId, UUID lectureId, String baseFilePath, int videoWidth) {
		return CompletableFuture.runAsync(() -> {
			if (videoWidth >= SMALL_WIDTH) {
				log.info("Creating 480p for lecture {}...", lectureId);
				fFmpegExecutor.createJob(
						getBuilder(baseFilePath + "-480.mp4", SMALL_WIDTH, SMALL_HEIGHT),
						progress -> loggerProgressWhileEncoding(progress, lectureId.toString(), "480p")
				).run();
				Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();
				lecture.setUrl480(sourceId);
				lectureRepository.save(lecture);
				log.info("Created 480p for lecture {}", lectureId);
			} else {
				log.info("Skipping 480p, as video width is {}", videoWidth);
			}
		});
	}
	
	private void sendResponse(Notification notification, UUID userId) {
		var userMessage = UserMessage.builder()
				.receiverId(userId)
				.body(NotificationDto.fromEntity(notification))
				.type(UserMessageType.PERSONAL)
				.build();
		messageSender.send(userMessage);
	}
	
	private FFmpegBuilder getBuilder(String outputFilePath, int width, int height) {
		return new FFmpegBuilder()
				.setInput(inputVideo)
				.overrideOutputFiles(true)
				
				.addOutput(outputFilePath)
				.setFormat("mp4")
				
				.setVideoCodec("libx264")
				.setVideoFrameRate(60, 1)
				.setVideoResolution(width, height)
				
				.setStrict(FFmpegBuilder.Strict.EXPERIMENTAL)
				.done();
	}
	
	private String getThumbnail(String id) {
		String imagePath = rootPath + "/video/" + id + "/thumbnail.png";
		FFmpegBuilder builder = new FFmpegBuilder()
				.setInput(inputVideo)
				.overrideOutputFiles(true)
				.addOutput(imagePath)
				.setFrames(1)
				.setVideoFilter("select='gte(n\\,150)'")
				.done();
		fFmpegExecutor.createJob(builder, progress -> loggerProgressWhileEncoding(progress, id, "Original&Thumbnail")).run();
		return "assets/video/" + id + "/thumbnail.png";
	}
	
	private void loggerProgressWhileEncoding(Progress progress, String id, String label) {
		double duration_ns = inputVideo.getFormat().duration * TimeUnit.SECONDS.toNanos(1);
		double percentage = progress.out_time_ns / duration_ns;
		
		log.info(
				String.format(
						"[%s][%s][%.0f%%] status:%s frame:%d time:%s ms fps:%.0f speed:%.2fx",
						id,
						label,
						percentage * 100,
						progress.status,
						progress.frame,
						FFmpegUtils.toTimecode(progress.out_time_ns, TimeUnit.NANOSECONDS),
						progress.fps.doubleValue(),
						progress.speed
				)
		);
	}
}
