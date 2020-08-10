package com.knewless.core.course.dto;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class CreateCourseRequestDto {
    private UUID userId;
    private String name;
    private String level;
    private String description;
    private Boolean isReleased;
    private List<UUID> lectures;
}
