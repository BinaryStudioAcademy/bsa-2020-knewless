package com.knewless.core.author;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorMainInfoDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AuthorMapper {
    AuthorMapper MAPPER = Mappers.getMapper(AuthorMapper.class);

    @Mapping(target = "biography", ignore = true)
    AuthorMainInfoDto authorBriefInfoToMainInfoDto(AuthorBriefInfoDto authorBriefInfoDto);
}
