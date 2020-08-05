package com.knewless.core.article.articleComment;

import com.knewless.core.article.articleComment.model.ArticleComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ArticleCommentRepository extends JpaRepository<ArticleComment, UUID> {
}
