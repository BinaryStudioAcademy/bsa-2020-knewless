package com.knewless.core.article.articleComment.dto;

import com.knewless.core.comments.SaveCommentRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class SaveArticleCommentRequest extends SaveCommentRequest {
	private UUID articleId;
	
	@Override
	public UUID getSourceId() {
		return articleId;
	}
}
