package com.knewless.core.author.mapper;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.model.Author;
import com.knewless.core.school.dto.SchoolBriefInfoDto;
import com.knewless.core.user.model.User;

public interface AuthorInfoMapper {

    static AuthorBriefInfoDto fromEntities(Author author, User user, SchoolBriefInfoDto schoolBriefInfo) {
        final var briefInfoDto = new AuthorBriefInfoDto();
        briefInfoDto.setId(user.getId());
        briefInfoDto.setName(author.getName());
        briefInfoDto.setAvatar(author.getAvatar());
        briefInfoDto.setRole(user.getRole().getName().name());
        briefInfoDto.setSchoolInfo(schoolBriefInfo);
        return briefInfoDto;
    }

}
