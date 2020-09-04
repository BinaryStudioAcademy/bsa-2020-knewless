package com.knewless.core.article.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ArticleDto {
    private UUID id;
    private String name;
    private String text;
    private String image;
    private UUID authorId;
    private String authorName;
}
