package com.knewless.core.author.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class AuthorSettingsDto {
    UUID id;
    UUID userId;
    String avatar;
    String name;
    String location;
    String company;
    String website;
    String biography;
}
