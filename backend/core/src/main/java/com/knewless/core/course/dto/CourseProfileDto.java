package com.knewless.core.course.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CourseProfileDto {
    private UUID id;
    private String name;
    private String category;
    private String author;
    private int timeSeconds;
    private String level;
    private String image;
    private int rating;
    private int progress;
}
