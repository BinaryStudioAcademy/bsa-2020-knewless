package com.knewless.core.course.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CourseLectureDto {
    private UUID id;
    private int index;
}
