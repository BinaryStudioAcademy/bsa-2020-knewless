package com.knewless.core.course.courseComment.dto;

import com.knewless.core.comments.CommentDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class CourseCommentDto extends CommentDto {
	private UUID courseId;
	
	@Override
	public UUID getSourceId() {
		return courseId;
	}
}
