package com.knewless.core.lecture.lectureComment.dto;

import com.knewless.core.comments.CommentDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class LectureCommentDto extends CommentDto {
	private UUID lectureId;
	
	@Override
	public UUID getSourceId() {
		return lectureId;
	}
}
