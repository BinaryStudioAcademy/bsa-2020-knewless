package com.knewless.core.article.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class FavouriteArticleDto {
    private UUID id;
    private String name;
    private String image;
    private String authorName;
    private Integer readingTime;
}
