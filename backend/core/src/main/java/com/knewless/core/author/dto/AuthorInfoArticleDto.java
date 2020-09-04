package com.knewless.core.author.dto;

import com.knewless.core.article.dto.ArticleDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class AuthorInfoArticleDto {
    private UUID id;
    private UUID userId;
    private String name;
    private String biography;
    private String avatar;
    private List<ArticleDto> articles;

}
