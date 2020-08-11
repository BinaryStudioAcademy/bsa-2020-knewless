package com.knewless.core.course.dto;

import com.knewless.core.course.model.Level;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@Data
public class AuthorCourseQueryResult {
    private UUID id;
    private String name;
    private Level level;
    private String author;
    private String category;
    private String imageSrc;
    private long duration;
    private long positiveReactions;
    private int allReactions;
    private Date updatedAt;
}
