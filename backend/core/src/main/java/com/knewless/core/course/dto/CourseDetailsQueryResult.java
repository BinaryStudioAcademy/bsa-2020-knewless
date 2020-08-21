package com.knewless.core.course.dto;

import com.knewless.core.course.model.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDetailsQueryResult {
    private UUID id;
    private String name;
    private Level level;
    private UUID authorId;
    private String authorName;
    private String imageSrc;
    private long duration;
    private String description;
    private long positiveReactions;
    private int allReactions;
    private int lectures;
}
