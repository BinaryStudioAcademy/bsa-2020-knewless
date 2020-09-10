package com.knewless.core.article.articleComment;

import com.knewless.core.article.articleComment.model.ArticleComment;
import com.knewless.core.comments.CommentRepository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ArticleCommentRepository extends CommentRepository<ArticleComment> {
	List<ArticleComment> findAllByArticleId(UUID sourceId, Pageable pageable);
}
