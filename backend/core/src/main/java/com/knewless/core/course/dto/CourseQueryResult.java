package com.knewless.core.course.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseQueryResult {
    private UUID id;
    private String name;
    private int level;
    private String author;
    private String category;
    private String imageSrc;
    private long duration;
    private long positiveReactions;
    private int allReactions;
}
