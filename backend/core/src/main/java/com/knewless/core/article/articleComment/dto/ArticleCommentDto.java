package com.knewless.core.article.articleComment.dto;

import com.knewless.core.comments.CommentDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class ArticleCommentDto extends CommentDto {
	private UUID articleId;
	
	@Override
	public UUID getSourceId() {
		return articleId;
	}
}
