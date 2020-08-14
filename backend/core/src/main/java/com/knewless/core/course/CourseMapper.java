package com.knewless.core.course;

import com.knewless.core.course.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CourseMapper {
	CourseMapper MAPPER = Mappers.getMapper(CourseMapper.class);

	@Mapping(source = "category", target = "category.name")
	@Mapping(target = "duration", expression = "java(CourseMapper.calculateDuration(s.getDuration()))")
	@Mapping(target = "level", expression = "java(s.getLevel().name())")
	@Mapping(target = "rating", expression = "java(CourseMapper.calculateRating(s.getAllReactions(), s.getPositiveReactions()))")
	CourseDto courseQueryResultToCourseDto(CourseQueryResult s);

	@Mapping(source = "imageSrc", target = "image")
	@Mapping(source = "duration", target = "timeMinutes")
	@Mapping(target = "level", expression = "java(s.getLevel().name())")
	@Mapping(target = "rating", expression = "java(CourseMapper.calculateRating(s.getAllReactions(), s.getPositiveReactions()))")
	CourseWithMinutesDto courseQueryToCourseWithMinutes(CourseQueryResult s);

	static int calculateRating(long allReactions, long positiveReactions) {
		return allReactions == 0 ? 0 :
				Math.round((float) positiveReactions / allReactions * 5);
	}

	static String calculateDuration(long minutes) {
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
