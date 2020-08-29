package com.knewless.core.path.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@AllArgsConstructor
@Data
public class AuthorPathQueryResult {
    private final UUID id;
    private final String name;
    private final String image;
    private final int courses;
    private final long seconds;
    private final Date updatedAt;
}
