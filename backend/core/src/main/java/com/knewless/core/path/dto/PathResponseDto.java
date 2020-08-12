package com.knewless.core.path.dto;

import com.knewless.core.course.dto.CourseResponseDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class PathResponseDto {
	private UUID id;
	private String name;
	private List<CourseResponseDto> courses;
}
