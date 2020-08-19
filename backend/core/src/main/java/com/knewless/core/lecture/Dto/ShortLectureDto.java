package com.knewless.core.lecture.Dto;

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
    private String lectureURL;
    private int timeMinutes;
}

//Dto for reusing lectures in different courses
