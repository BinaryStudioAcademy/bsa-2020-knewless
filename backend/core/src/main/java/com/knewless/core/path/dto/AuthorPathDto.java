package com.knewless.core.path.dto;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class AuthorPathDto {
    private UUID id;
    private String name;
    private long courses;
    private String logoSrc;
    private long duration;
    private Date updatedAt;
}
