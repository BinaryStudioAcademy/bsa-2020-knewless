package com.knewless.core.course.courseComment.dto;

import com.knewless.core.comments.SaveCommentRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class SaveCourseCommentRequest extends SaveCommentRequest {
	private UUID courseId;
	
	@Override
	public UUID getSourceId() {
		return courseId;
	}
}
