package com.knewless.core.article;

import com.knewless.core.article.model.Article;
import com.knewless.core.author.dto.AuthorArticlesDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ArticleRepository extends JpaRepository<Article, UUID> {

    @Query("select a from Article a where a.author.id = :authorId order by a.createdAt desc")
    List<Article> getArticlesByAuthorId(UUID authorId);

    @Query("select new com.knewless.core.author.dto.AuthorArticlesDto(a.id, a.name, a.text, a.image) " +
            "from Article a where a.author.id = :authorId order by a.createdAt desc")
    List<AuthorArticlesDto> getArticleDtoByAuthorId(@Param("authorId") UUID authorId);

    @Query("SELECT a " +
            "FROM Article a " +
                "INNER JOIN Favorite f ON f.sourceId = a.id " +
            "WHERE f.user.id = :userId " +
            "ORDER BY a.createdAt DESC")
    List<Article> getFavouriteArticlesByUserId(@Param("userId") UUID userId);

    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END " +
            "FROM Article a " +
                "INNER JOIN Favorite f ON f.sourceId = :id ")
    boolean getIsFavouriteById(UUID id);
}
