package com.knewless.core.course.courseComment.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class SaveCourseCommentRequest {
	private UUID id;
	private String text;
	private UUID courseId;
}
