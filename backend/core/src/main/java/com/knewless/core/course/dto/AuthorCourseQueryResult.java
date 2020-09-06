package com.knewless.core.course.dto;

import com.knewless.core.course.model.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorCourseQueryResult {
    private UUID id;
    private String name;
    private Level level;
    private String author;
    private String imageSrc;
    private long duration;
    private long positiveReactions;
    private int allReactions;
    private Date updatedAt;
    private int lectures;
}
