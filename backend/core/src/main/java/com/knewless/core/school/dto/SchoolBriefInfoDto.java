package com.knewless.core.school.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class SchoolBriefInfoDto {
    private UUID id;
    private String name;
    private String logo;
    private Integer membersCount;
}
