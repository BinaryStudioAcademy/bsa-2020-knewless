package com.knewless.core.path;

import com.knewless.core.path.dto.PathDto;
import com.knewless.core.path.dto.PathQueryResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PathMapper {
    PathMapper MAPPER = Mappers.getMapper(PathMapper.class);

    @Mapping(target = "duration", ignore = true)
    @Mapping(target = "logoSrc", source = "image")
    PathDto pathQueryResultToPathDto(PathQueryResult pathQueryResult);
}
