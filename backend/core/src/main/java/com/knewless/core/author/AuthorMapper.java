package com.knewless.core.author;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorMainInfoDto;
import com.knewless.core.author.dto.FavouriteAuthorResponseDto;
import com.knewless.core.author.model.Author;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AuthorMapper {
    AuthorMapper MAPPER = Mappers.getMapper(AuthorMapper.class);

    @Mapping(target = "biography", ignore = true)
    AuthorMainInfoDto authorBriefInfoToMainInfoDto(AuthorBriefInfoDto authorBriefInfoDto);

    @Mapping(target="name", expression = "java(author.getFullName())")
    @Mapping(target = "school", expression = "java(author.getSchool() == null? \"\" : author.getSchool().getName())")
    @Mapping(target = "paths", ignore = true)
    @Mapping(target = "courses", ignore = true)
    @Mapping(target = "followers", ignore = true)
    FavouriteAuthorResponseDto authorToFavouriteAuthorResponseDto(Author author);
}
