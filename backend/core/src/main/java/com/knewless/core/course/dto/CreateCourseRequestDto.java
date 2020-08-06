package com.knewless.core.course.dto;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class CreateCourseRequestDto {
    private String name;
    private String level;
    private List<UUID> lecturesId;
}
