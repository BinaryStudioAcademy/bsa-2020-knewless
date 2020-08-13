package com.knewless.core.path.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class PathQueryResult {
    private final UUID id;
    private final String name;
    private final String image;
    private final int courses;
    private final long minutes;
}
