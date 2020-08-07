package com.knewless.core.author.mapper;

import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.author.model.Author;
import com.knewless.core.user.model.User;
import lombok.Data;

public class AuthorMapper {
  public static AuthorSettingsDto fromEntity(Author author) {
        if (author == null)
            return null;
        var result = new AuthorSettingsDto();
        result.setId(author.getId());
        result.setUserId(author.getUser().getId());
        result.setAvatar(author.getAvatar());
        result.setName(author.getName());
        result.setLocation(author.getLocation());
        result.setBiography(author.getBiography());
        result.setCompany(author.getCompany());
        result.setWebsite(author.getWebsite());
        return result;
    }
    public static Author fromDto(AuthorSettingsDto author, User user) {
        if (author == null)
            return null;
        var result = new Author();
        result.setId(author.getId());
        result.setUser(user);
        result.setAvatar( author.getAvatar());
        result.setName(author.getName());
        result.setLocation(author.getLocation());
        result.setBiography(author.getBiography());
        result.setCompany(author.getCompany());
        result.setWebsite(author.getWebsite());
        return result;
    }
}
