package com.knewless.core.author.mapper;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.model.Author;
import com.knewless.core.school.dto.SchoolBriefInfoDto;
import com.knewless.core.user.role.model.RoleType;

import java.util.Optional;

public interface AuthorInfoMapper {

    static AuthorBriefInfoDto fromEntities(Author author, Integer followersCount,
                                           Optional<SchoolBriefInfoDto> schoolBriefInfo) {
        final var briefInfoDto = new AuthorBriefInfoDto();
        briefInfoDto.setId(author.getId());
        briefInfoDto.setFirstName(author.getFirstName());
        briefInfoDto.setLastName(author.getLastName());
        briefInfoDto.setAvatar(author.getAvatar());
        briefInfoDto.setRole(RoleType.AUTHOR.name());
        briefInfoDto.setSchoolInfo(schoolBriefInfo);
        briefInfoDto.setFollowers(followersCount);
        return briefInfoDto;
    }

}
