package com.knewless.core.author.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class FavouriteAuthorResponseDto {
    private UUID id;
    private String avatar;
    private String name;
    private String school;
    private int paths;
    private int courses;
    private int followers;
}
