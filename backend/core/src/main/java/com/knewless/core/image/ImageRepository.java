package com.knewless.core.image;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Repository
public class ImageRepository {

    @Value(value = "${fs.root}")
    private String ROOT;
    @Value(value = "${fs.images}")
    private String IMAGES;
    @Value(value = "${fs.image_url}")
    private String IMAGE_URL;

    @PostConstruct
    public void init() {
        new File(ROOT).mkdir();
        new File(IMAGES).mkdir();
    }


    public String saveImage(String path, byte[] file) {
        try {
            String exstension = Optional.ofNullable(path)
                    .filter(f -> f.contains("."))
                    .map(f -> f.substring(path.lastIndexOf(".") + 1)).get();
            String filename = UUID.randomUUID().toString() + "." + exstension;
            Path filepath = Path.of(IMAGES + "/" + filename);
            Files.write(filepath, file);
            return IMAGE_URL + filepath.getFileName();
        } catch (Exception e) {
            throw new RuntimeException("Could not save the file. Error: " + e.getMessage());

        }
    }
}
