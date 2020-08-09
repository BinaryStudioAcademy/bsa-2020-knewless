package com.knewless.core.path.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PathDto {
    private String name;
    private long courses;
    private String logoSrc;
    private PathDurationDto duration;
}
