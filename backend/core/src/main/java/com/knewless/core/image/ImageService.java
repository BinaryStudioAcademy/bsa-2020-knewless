package com.knewless.core.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    @Autowired
    ImageRepository imageRepository;

    public ImageDto uploadImage(String filename, byte[] bytes) {
        ImageDto savedImage = new ImageDto(imageRepository.saveImage(filename, bytes));
        return savedImage;
    }
}
