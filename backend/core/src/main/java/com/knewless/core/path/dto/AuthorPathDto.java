package com.knewless.core.path.dto;

import lombok.Data;

import java.util.Date;

@Data
public class AuthorPathDto {
    private String name;
    private long courses;
    private String logoSrc;
    private PathDurationDto duration;
    private Date updatedAt;
}
