package com.knewless.core.course.dto;

import com.knewless.core.tag.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {
    private UUID id;
    private String name;
    private String level;
    private String author;
    private UUID authorId;
    private List<TagDto> tags;
    private String imageSrc;
    private long duration;
    private int rating;
    private boolean isReviewed;
    private int ratingCount;
}
