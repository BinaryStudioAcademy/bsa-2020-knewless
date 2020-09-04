package com.knewless.core.article.mapper;

import com.knewless.core.article.dto.ArticleDto;
import com.knewless.core.article.dto.ArticleFullDto;
import com.knewless.core.article.model.Article;
import com.knewless.core.author.mapper.AuthorMapper;
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
        result.setId(article.getId());
        result.setAuthorId(article.getAuthor().getId());
        result.setAuthorName(article.getAuthor().getFullName());
        result.setName(article.getName());
        result.setText(article.getText());
        result.setImage(article.getImage());
        return result;
    }
    public static ArticleFullDto fromEntintyToFull(Article article) {
        ArticleFullDto result = new ArticleFullDto();
        result.setName(article.getName());
        result.setText(article.getText());
        result.setAuthor(AuthorMapper.fromEntinyToArticleInfo(article.getAuthor()));
        result.setImage(article.getImage());
        return result;
    }
}
