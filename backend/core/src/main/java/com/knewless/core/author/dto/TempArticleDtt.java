package com.knewless.core.author.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TempArticleDtt {
    private UUID id;
    private String name;
    private String text;
    private String image;
}
