package com.knewless.core.path.dto;

import lombok.Data;

@Data
public class PathQueryResult {
    private final String name;
    private final String image;
    private final int courses;
    private final long minutes;
}
