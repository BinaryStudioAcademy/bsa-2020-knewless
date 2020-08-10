package com.knewless.core.student.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class StudentSettingsDto {
    private UUID id;
    private UUID userId;
    private String avatar;
    private String firstName;
    private String lastName;
    private String job;
    private String location;
    private String company;
    private String website;
    private String biography;
    private String direction;
    private int experience;
    private String level;
    private String industry;
    private String role;
    private String employment;
    private String education;
    private int year;

}
