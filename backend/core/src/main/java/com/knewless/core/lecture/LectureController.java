package com.knewless.core.lecture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/lecture")
public class LectureController {
    @Autowired
    private LectureService lectureService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addLecture(@RequestParam("video") MultipartFile file,
                           @RequestParam("name") String name,
                           @RequestParam("description") String description) throws IOException {
        lectureService.addLecture(name, description, file.getBytes(), file.getOriginalFilename());
    }
}
