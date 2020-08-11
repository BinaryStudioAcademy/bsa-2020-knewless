package com.knewless.core.author.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class AuthorSettingsDto {
    private UUID id;
    private UUID userId;
    private String avatar;
    private String firstName;
    private String lastName;
    private String location;
    private String company;
    private String job;
    private String website;
    private String twitter;
    private String biography;
}
