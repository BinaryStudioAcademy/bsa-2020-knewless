package com.knewless.core.fileManager;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@Slf4j
@Service
public class FileManager {
    @Value("${fs.root}")
    private String rootPath;

    public String saveVideo(MultipartFile video, String fileName) {
        String[] concatString = fileName.split("\\.");
        String fileType = concatString[concatString.length - 1];
        String folderId = UUID.randomUUID().toString();
        Path folderPath = Path.of(rootPath).resolve("video").resolve(folderId);

        if (!Files.exists(folderPath)) {
            try {
                Files.createDirectories(folderPath);

                var imagePath = folderPath.resolve(folderId + "-origin." + fileType);
                Files.createFile(imagePath);
                video.transferTo(imagePath);
            } catch (IOException e) {
                log.error(e.getMessage());
            }
        }
        return folderId;
    }
}
