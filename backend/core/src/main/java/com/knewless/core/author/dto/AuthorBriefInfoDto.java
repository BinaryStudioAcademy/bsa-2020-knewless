package com.knewless.core.author.dto;

import com.knewless.core.school.dto.SchoolBriefInfoDto;
import lombok.Data;

import java.util.Optional;
import java.util.UUID;

@Data
public class AuthorBriefInfoDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String role;
    private String avatar;
    private Optional<SchoolBriefInfoDto> schoolInfo;
    private Integer followers;
}
