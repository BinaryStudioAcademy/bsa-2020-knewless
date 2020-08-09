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
        inputVideo = ffprobe.probe(baseFilePath + "-origin.mp4");
        getThumbnail(id);

        FFmpegStream videoInfo = inputVideo.getStreams().get(0);

        if (videoInfo.width >= 720) {
            fFmpegExecutor.createJob(
                    getBuilder(baseFilePath + "-480.mp4", SMALL_WIDTH, SMALL_HEIGHT),
                    this::loggerProgressWhileEncoding
            ).run();

            updateLecture(id, entityId);
            sendResponse(id, entityId);
        }
        if (videoInfo.width >= 1280) {
            fFmpegExecutor.createJob(getBuilder(
                    baseFilePath + "-720.mp4", HD_WIDTH, HD_HEIGHT),
                    this::loggerProgressWhileEncoding
            ).run();
        }
        if (videoInfo.width >= 1920) {
            fFmpegExecutor.createJob(getBuilder(
                    baseFilePath + "-1080.mp4", FULL_HD_WIDTH, FULL_HD_HEIGHT),
                    this::loggerProgressWhileEncoding
            ).run();
        }
    }

    private void updateLecture(String sourceId, UUID lectureId) {
        Lecture lecture = lectureRepository.findById(lectureId).orElseThrow();
        lecture.setSourceUrl(sourceId);
        lecture.setDuration((int) (inputVideo.getFormat().duration));
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

    private void getThumbnail(String id) {

        FFmpegBuilder builder = new FFmpegBuilder()
                .setInput(inputVideo)
                .overrideOutputFiles(true)
                .addOutput(rootPath + "/video/" + id + "/thumbnail.png")
                .setFrames(1)
                .setVideoFilter("select='gte(n\\,150)'")
                .done();
        fFmpegExecutor.createJob(builder, this::loggerProgressWhileEncoding).run();
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