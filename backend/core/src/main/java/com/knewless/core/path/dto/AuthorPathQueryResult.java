package com.knewless.core.path.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class AuthorPathQueryResult {
    private final String name;
    private final String image;
    private final int courses;
    private final long seconds;
    private final Date updatedAt;
}
