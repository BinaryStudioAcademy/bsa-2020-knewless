package com.knewless.core.path;

import com.knewless.core.author.model.Author;
import com.knewless.core.path.dto.*;
import com.knewless.core.path.model.Path;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PathMapper {
    PathMapper MAPPER = Mappers.getMapper(PathMapper.class);

    @Mapping(source = "seconds", target = "duration")
    @Mapping(target = "logoSrc", source = "image")
    PathDto pathQueryResultToPathDto(PathQueryResult pathQueryResult);

    @Mapping(source = "seconds", target = "duration")
    @Mapping(target = "logoSrc", source = "image")
    AuthorPathDto authorPathQueryResultToAuthorPathDto(AuthorPathQueryResult pathQueryResult);

    @Mapping(target = "courses", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "duration", ignore = true)
    @Mapping(target = "imageTag.imageSrc", source = "imageTag.source")
    PathDetailsDto pathToPathDetailsDto(Path path);
}
