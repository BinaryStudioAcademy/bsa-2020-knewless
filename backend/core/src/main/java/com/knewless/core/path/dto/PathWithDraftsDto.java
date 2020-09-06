package com.knewless.core.path.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PathWithDraftsDto {
    private UUID id;
    private String name;
    private long courses;
    private String logoSrc;
    private long duration;
    private boolean isReleased;
}
