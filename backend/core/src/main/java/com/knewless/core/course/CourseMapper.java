package com.knewless.core.course;

import com.knewless.core.course.dto.CourseDto;
import com.knewless.core.course.dto.CourseQueryResult;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CourseMapper {
    CourseMapper MAPPER = Mappers.getMapper(CourseMapper.class);

    @Mapping(source = "category", target = "category.name")
    @Mapping(target = "rating", ignore = true)
    @Mapping(target = "level", ignore = true)
    @Mapping(target = "duration", ignore = true)
    CourseDto courseQueryResultToCourseDto(CourseQueryResult courseQueryResult);
}
