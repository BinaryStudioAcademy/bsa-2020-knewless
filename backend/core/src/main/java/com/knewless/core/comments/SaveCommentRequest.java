package com.knewless.core.comments;

import lombok.Data;

import java.util.UUID;

@Data
public abstract class SaveCommentRequest {
	private UUID id;
	private String text;
	public abstract UUID getSourceId();
}
