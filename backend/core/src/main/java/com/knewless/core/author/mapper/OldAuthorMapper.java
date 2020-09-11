package com.knewless.core.author.mapper;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorInfoArticleDto;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.author.model.Author;
import com.knewless.core.school.dto.SchoolBriefInfoDto;
import com.knewless.core.user.model.User;
import com.knewless.core.user.role.model.RoleType;
import lombok.Data;

import java.util.Optional;
import java.util.UUID;

public class OldAuthorMapper {
    public static AuthorSettingsDto fromEntity(Author author) {
        if (author == null)
            return null;
        var result = new AuthorSettingsDto();
        result.setId(author.getId());
        result.setUserId(author.getUser().getId());
        result.setAvatar(author.getAvatar());
        result.setFirstName(author.getFirstName());
        result.setLastName(author.getLastName());
        result.setLocation(author.getLocation());
        result.setBiography(author.getBiography());
        result.setCompany(author.getCompany());
        result.setJob(author.getJob());
        result.setWebsite(author.getWebsite());
        result.setTwitter(author.getTwitter());
        return result;
    }

    public static Author fromDto(AuthorSettingsDto author, User user) {
        if (author == null)
            return null;
        var result = new Author();
        result.setId(author.getId());
        result.setUser(user);
        result.setAvatar(author.getAvatar());
        result.setFirstName(author.getFirstName());
        result.setLastName(author.getLastName());
        result.setLocation(author.getLocation());
        result.setBiography(author.getBiography());
        result.setCompany(author.getCompany());
        result.setJob(author.getJob());
        result.setWebsite(author.getWebsite());
        result.setTwitter(author.getTwitter());
        return result;
    }
    public static AuthorInfoArticleDto fromEntinyToArticleInfo(Author author){
        AuthorInfoArticleDto result = new AuthorInfoArticleDto();
        result.setId(author.getId());
        result.setUserId(author.getUser().getId());
        result.setName(author.getFullName());
        result.setAvatar(author.getAvatar());
        result.setBiography(author.getBiography());
        return result;
    }

    public static AuthorBriefInfoDto fromEntities(Author author, Integer followersCount,
                                           Optional<SchoolBriefInfoDto> schoolBriefInfo, UUID userId) {
        final var briefInfoDto = new AuthorBriefInfoDto();
        briefInfoDto.setId(author.getId());
        briefInfoDto.setUserId(userId);
        briefInfoDto.setFirstName(author.getFirstName());
        briefInfoDto.setLastName(author.getLastName());
        briefInfoDto.setAvatar(author.getAvatar());
        briefInfoDto.setRole(RoleType.AUTHOR.name());
        briefInfoDto.setSchoolInfo(schoolBriefInfo);
        briefInfoDto.setFollowers(followersCount);
        return briefInfoDto;
    }

}
