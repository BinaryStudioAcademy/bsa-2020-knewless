package com.knewless.core.path.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class FavouritePathResponseDto {
    private UUID id;
    private String name;
    private UUID authorId;
    private String author;
    private int duration;
    private String image;
    private int courses;
}
