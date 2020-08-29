package com.knewless.core.course.dto;

import com.knewless.core.course.model.Level;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Builder
public class FavouriteCourseResponseDto {
    private UUID id;
    private String name;
    private UUID authorId;
    private String authorName;
    private int duration;
    private String description;
    private int rating;
    private Level level;
    private Date createdAt;
    private String image;
}
