package com.knewless.core.path.dto;

import lombok.Data;

@Data
public class PathDto {
    private String name;
    private long courses;
    private String logoSrc;
    private PathDurationDto duration;
}
