package com.knewless.core.course.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateCourseResponseDto {
    private UUID id;
    private Boolean isSuccessfull;
}
