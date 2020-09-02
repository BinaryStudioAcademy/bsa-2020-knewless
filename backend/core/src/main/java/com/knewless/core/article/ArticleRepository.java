package com.knewless.core.article;

import com.knewless.core.article.model.Article;
import com.knewless.core.author.dto.AuthorArticlesDto;
import com.knewless.core.author.dto.TempArticleDtt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ArticleRepository extends JpaRepository<Article, UUID> {
    List<Article> getArticlesByAuthorId(UUID authorId);

    @Query("select new com.knewless.core.author.dto.AuthorArticlesDto(a.name, a.id) " +
            "from Article a where a.author.id = :authorId")
    List<AuthorArticlesDto> getArticleDtoByAuthorId(@Param("authorId") UUID authorId);
}
