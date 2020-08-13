package com.knewless.core.course.dto;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class CourseResponseDto {
    private UUID id;
    private String name;
    private String level;
    private Date release;
}
