package fileprocessor.videoencoder;

import fileprocessor.lecture.LectureRepository;
import fileprocessor.lecture.model.Lecture;
import fileprocessor.messaging.Message;
import fileprocessor.messaging.MessageSender;
import fileprocessor.messaging.MessageType;
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
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.UUID;
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
    private FFprobe ffprobe;
    @Autowired
    private FFmpegExecutor fFmpegExecutor;
    @Value("${fs.root}")
    private String rootPath;

    private FFmpegProbeResult inputVideo;

    public void encode(String id, UUID entityId) throws IOException {
        String baseFilePath = rootPath + "/video/" + id + "/" + id;
        String path = "assets/video/" + id + "/" + id;
        inputVideo = ffprobe.probe(baseFilePath + "-origin.mp4");
        String thumbnail = getThumbnail(id);
        FFmpegStream videoInfo = inputVideo.getStreams().get(0);
        updateOrigin(path + "-origin.mp4", entityId, thumbnail);
        if (videoInfo.width >= SMALL_WIDTH) {
            fFmpegExecutor.createJob(
                    getBuilder(baseFilePath + "-480.mp4", SMALL_WIDTH, SMALL_HEIGHT),
                    this::loggerProgressWhileEncoding
            ).run();

            update480(path + "-480.mp4", entityId);
            sendResponse(id, entityId);
        }
        if (videoInfo.width >= HD_WIDTH) {
            fFmpegExecutor.createJob(getBuilder(
                    baseFilePath + "-720.mp4", HD_WIDTH, HD_HEIGHT),
                    this::loggerProgressWhileEncoding
            ).run();
            update720(path + "-720.mp4", entityId);
        }
        if (videoInfo.width >= FULL_HD_WIDTH) {
            fFmpegExecutor.createJob(getBuilder(
                    baseFilePath + "-1080.mp4", FULL_HD_WIDTH, FULL_HD_HEIGHT),
                    this::loggerProgressWhileEncoding
            ).run();
            update1080(path + "-1080.mp4", entityId);
        }
    }

    private void updateOrigin(String sourceId, UUID lectureId, String thumbnail) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();
        lecture.setUrlOrigin(sourceId);
        lecture.setPreviewImage(thumbnail);
        lecture.setDuration((int) (inputVideo.getFormat().duration));
        lectureRepository.save(lecture);
    }
    private void update1080(String sourceId, UUID lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();
        lecture.setUrl1080(sourceId);
        lectureRepository.save(lecture);
    }
    private void update720(String sourceId, UUID lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();
        lecture.setUrl720(sourceId);
        lectureRepository.save(lecture);
    }
    private void update480(String sourceId, UUID lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();
        lecture.setUrl480(sourceId);
        lectureRepository.save(lecture);
    }


    private void sendResponse(String folderId, UUID entityId) {
        Message message = new Message();
        message.setFolderId(folderId);
        message.setEntityId(entityId);
        message.setType(MessageType.RESPONSE);
        messageSender.send(message);
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
        fFmpegExecutor.createJob(builder, this::loggerProgressWhileEncoding).run();
        return "assets/video/" + id + "/thumbnail.png";
    }

    private void loggerProgressWhileEncoding(Progress progress) {
        double duration_ns = inputVideo.getFormat().duration * TimeUnit.SECONDS.toNanos(1);
        double percentage = progress.out_time_ns / duration_ns;

        log.info(
                String.format(
                        "[%.0f%%] status:%s frame:%d time:%s ms fps:%.0f speed:%.2fx%n",
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
