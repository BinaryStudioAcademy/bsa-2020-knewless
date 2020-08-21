package com.knewless.core.lecture.dto;

import lombok.Data;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShortLectureDto {
    private UUID id;
    private String name;
    private String description;
    private String webLink;
    private String urlOrigin;
    private String url1080;
    private String url720;
    private String url480;
    private int timeMinutes;
}

//Dto for reusing lectures in different courses
