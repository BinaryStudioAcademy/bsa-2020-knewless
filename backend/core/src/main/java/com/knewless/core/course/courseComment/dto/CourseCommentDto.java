package com.knewless.core.course.courseComment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knewless.core.user.dto.BriefUserDto;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public class CourseCommentDto {
	private UUID id;
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private ZonedDateTime createdAt;
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private ZonedDateTime updatedAt;
	private String text;
	private UUID courseId;
	private BriefUserDto user;
}
