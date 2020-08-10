package com.knewless.core.author.dto;

import com.knewless.core.school.dto.SchoolBriefInfoDto;
import lombok.Data;

import java.util.UUID;

@Data
public class AuthorBriefInfoDto {
    private UUID id;
    private String name;
    private String role;
    private String avatar;
    private SchoolBriefInfoDto schoolInfo;
    private Integer followers;
}
