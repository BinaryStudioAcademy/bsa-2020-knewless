package com.knewless.core.article.articleReaction;

import com.knewless.core.article.articleReaction.model.ArticleReaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ArticleReactionRepository extends JpaRepository<ArticleReaction, UUID> {
}
