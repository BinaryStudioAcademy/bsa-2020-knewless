package com.knewless.core.lecture.lectureComment.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knewless.core.user.dto.BriefUserDto;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class LectureCommentDto {
	private UUID id;
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private LocalDateTime createdAt;
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private LocalDateTime updatedAt;
	private String text;
	private UUID lectureId;
	private BriefUserDto user;
}
