package com.knewless.core.course.dto;

import com.knewless.core.category.dto.CategoryDto;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class AuthorCourseDto {
    private UUID id;
    private String name;
    private String level;
    private String author;
    private CategoryDto category;
    private String imageSrc;
    private String duration;
    private int rating;
    private Date updatedAt;
}
