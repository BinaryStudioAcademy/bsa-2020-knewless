package com.knewless.core.course.dto;

import com.knewless.core.tag.dto.TagDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class CourseProfileDto {
    private UUID id;
    private String name;
    private String category;
    private String author;
    private List<TagDto> tags;
    private int timeSeconds;
    private String level;
    private String image;
    private int rating;
    private int progress;
    private int allReactions;
}
