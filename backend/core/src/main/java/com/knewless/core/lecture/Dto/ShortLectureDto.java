package com.knewless.core.lecture.Dto;

import lombok.Data;

import java.util.UUID;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class ShortLectureDto {
    private UUID id;
    private String name;
    private String description;
    private int timeMinutes;
}

//Dto for reusing lectures in different courses
