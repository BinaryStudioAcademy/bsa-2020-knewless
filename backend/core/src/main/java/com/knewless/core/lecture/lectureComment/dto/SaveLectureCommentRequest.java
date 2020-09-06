package com.knewless.core.lecture.lectureComment.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class SaveLectureCommentRequest {
	private UUID id;
	private String text;
	private UUID lectureId;
}
