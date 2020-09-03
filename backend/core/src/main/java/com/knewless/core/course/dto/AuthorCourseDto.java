package com.knewless.core.course.dto;

import com.knewless.core.tag.dto.TagDto;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class AuthorCourseDto {
    private UUID id;
    private String name;
    private String level;
    private String author;
    private List<TagDto> tags;
    private String imageSrc;
    private long duration;
    private int rating;
    private Date updatedAt;
}
