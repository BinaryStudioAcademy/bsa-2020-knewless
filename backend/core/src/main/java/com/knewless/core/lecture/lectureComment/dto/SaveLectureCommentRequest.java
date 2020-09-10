package com.knewless.core.lecture.lectureComment.dto;

import com.knewless.core.comments.SaveCommentRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class SaveLectureCommentRequest extends SaveCommentRequest {
	private UUID lectureId;
	
	@Override
	public UUID getSourceId() {
		return lectureId;
	}
}
