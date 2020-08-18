package com.knewless.core.course.dto;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class CreateCourseRequestDto {
    private String name;
    private String image;
    private String level;
    private String description;
    private Boolean isReleased;
    private List<UUID> lectures;
}
