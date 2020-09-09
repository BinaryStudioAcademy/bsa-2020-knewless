package com.knewless.core.comments;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.knewless.core.user.dto.BriefUserDto;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
public abstract class CommentDto {
	private UUID id;
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private ZonedDateTime createdAt;
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private ZonedDateTime updatedAt;
	private String text;
	private BriefUserDto user;
	
	public abstract UUID getSourceId();
}
