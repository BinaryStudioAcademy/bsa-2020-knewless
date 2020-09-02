package com.knewless.core.article.mapper;

import com.knewless.core.article.dto.ArticleDto;
import com.knewless.core.article.model.Article;
import com.knewless.core.author.model.Author;

public class ArticleMapper {
    public static Article fromDto(ArticleDto article, Author author) {
        Article result = new Article();
        result.setAuthor(author);
        result.setName(article.getName());
        result.setText(article.getText());
        result.setImage(article.getImage());
        return result;
    }

    public static ArticleDto fromEntinty(Article article) {
        ArticleDto result = new ArticleDto();
        result.setAuthorId(article.getAuthor().getId());
        result.setName(article.getName());
        result.setText(article.getText());
        result.setImage(article.getImage());
        return result;
    }
}
