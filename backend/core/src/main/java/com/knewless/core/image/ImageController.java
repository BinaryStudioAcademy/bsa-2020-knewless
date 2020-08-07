package com.knewless.core.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/image")
public class ImageController {
    @Autowired
    ImageService imageService;
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ImageDto uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uploadImage(file.getOriginalFilename(), file.getBytes());
    }
}
