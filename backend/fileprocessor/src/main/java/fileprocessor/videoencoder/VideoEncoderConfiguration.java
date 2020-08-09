package fileprocessor.videoencoder;

import lombok.extern.slf4j.Slf4j;
import net.bramp.ffmpeg.FFmpeg;
import net.bramp.ffmpeg.FFmpegExecutor;
import net.bramp.ffmpeg.FFprobe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;

@Slf4j
@Configuration
public class VideoEncoderConfiguration {
    @Value("${ffmpeg.path}")
    private String ffmpegPath;

    @Value("${ffprobe.path}")
    private String ffprobePath;

    @Value("${fs.root}")
    private String rootPath;

    @Bean
    public FFmpeg ffmpeg() throws IOException {
        File file = new File(ffmpegPath);
        if (file.isFile()) {
            return new FFmpeg(ffmpegPath);
        }
        log.error(" [x] Ffmpeg is not found with path: " + ffmpegPath);
        throw new IOException();
    }

    @Bean
    public FFprobe ffprobe() throws IOException {
        File file = new File(ffprobePath);
        if (file.isFile()) {
            return new FFprobe(ffprobePath);
        }
        log.error(" [x] Ffprobe is not found with path: " + ffmpegPath);
        throw new IOException();
    }

    @Bean
    public FFmpegExecutor fFmpegExecutor() throws IOException {
        return new FFmpegExecutor(ffmpeg(), ffprobe());
    }

}
