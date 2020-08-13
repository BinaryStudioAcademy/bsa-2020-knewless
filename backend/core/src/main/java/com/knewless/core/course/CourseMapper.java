package com.knewless.core.course;

import com.knewless.core.course.dto.AuthorCourseDto;
import com.knewless.core.course.dto.AuthorCourseQueryResult;
import com.knewless.core.course.dto.CourseDto;
import com.knewless.core.course.dto.CourseQueryResult;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CourseMapper {
	CourseMapper MAPPER = Mappers.getMapper(CourseMapper.class);

	@Mapping(source = "category", target = "category.name")
	@Mapping(target = "rating", ignore = true)
	CourseDto courseQueryResultToCourseDto(CourseQueryResult courseQueryResult);

	@SuppressWarnings("unused")
	@AfterMapping
	default void ratingLevelDuration(@MappingTarget CourseDto courseDto, CourseQueryResult queryResult) {
		courseDto.setRating(queryResult.getAllReactions() == 0 ? 0
				: Math.round((float) queryResult.getPositiveReactions() /
				queryResult.getAllReactions() * 5));
		courseDto.setLevel(queryResult.getLevel().name());
		courseDto.setDuration(getDuration(queryResult.getDuration()));
	}

	static String getDuration(long minutes) {
		long hh = minutes / 60;
		long mm = minutes % 60;
		return String.format("%dh %02dm", hh, mm);
	}

	@Mapping(source = "category", target = "category.name")
	@Mapping(target = "rating", ignore = true)
	@Mapping(target = "level", ignore = true)
	@Mapping(target = "duration", ignore = true)
	AuthorCourseDto authorCourseQueryResultToAuthorCourseDto(AuthorCourseQueryResult courseQueryResult);
}
