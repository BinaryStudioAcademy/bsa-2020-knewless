package com.knewless.core.author.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorArticlesDto {
    private UUID id;
    private String name;
    private String text;
    private String image;
}
