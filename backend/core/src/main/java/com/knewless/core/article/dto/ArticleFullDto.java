package com.knewless.core.article.dto;

import com.knewless.core.author.dto.AuthorInfoArticleDto;
import lombok.Data;

import java.util.UUID;
@Data
public class ArticleFullDto {
    private UUID id;
    private String name;
    private String text;
    private String image;
    private AuthorInfoArticleDto author;
}
