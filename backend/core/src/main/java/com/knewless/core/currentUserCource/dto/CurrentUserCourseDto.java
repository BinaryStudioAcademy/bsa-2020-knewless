package com.knewless.core.currentUserCource.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CurrentUserCourseDto {
    private UUID id;
    private UUID userId;
    private UUID courseId;
}
