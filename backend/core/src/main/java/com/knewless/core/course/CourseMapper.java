package com.knewless.core.course;

import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CourseMapper {
    CourseMapper MAPPER = Mappers.getMapper(CourseMapper.class);

    static int calculateRating(long allReactions, long positiveReactions) {
        return allReactions == 0 ? 0 :
              (int) Math.floor(((float) positiveReactions / allReactions)+0.5);
    }

    @Mapping(target = "level", expression = "java(s.getLevel() == null? null : s.getLevel().name())")
    @Mapping(target = "rating", expression = "java(CourseMapper.calculateRating(s.getAllReactions(), s.getPositiveReactions()))")
    @Mapping(source = "allReactions", target = "ratingCount")
    @Mapping(target = "reviewed", ignore = true)
    @Mapping(target = "tags", ignore = true)
    CourseDto courseQueryResultToCourseDto(CourseQueryResult s);

    @Mapping(source = "imageSrc", target = "image")
    @Mapping(source = "duration", target = "timeSeconds")
    @Mapping(target = "level", expression = "java(s.getLevel().name())")
    @Mapping(target = "rating", expression = "java(CourseMapper.calculateRating(s.getAllReactions(), s.getPositiveReactions()))")
    CourseWithMinutesDto courseQueryToCourseWithMinutes(CourseQueryResult s);

    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "progress", ignore = true)
    @Mapping(source = "imageSrc", target = "image")
    @Mapping(source = "duration", target = "timeSeconds")
    @Mapping(target = "level", expression = "java(s.getLevel().name())")
    @Mapping(target = "rating", expression = "java(CourseMapper.calculateRating(s.getAllReactions(), s.getPositiveReactions()))")
    CourseProfileDto courseQueryToCourseProfileDto(CourseQueryResult s);

    @Mapping(target = "reviewed", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "rating",
            expression =
                    "java(CourseMapper.calculateRating(course.getAllReactions(), course.getPositiveReactions()))"
    )
    @Mapping(target = "ratingCount", source = "allReactions")
    AuthorCourseDto authorCourseQueryResultToAuthorCourseDto(AuthorCourseQueryResult course);

    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "members", ignore = true)
    AuthorCourseWithTagsDto authorCourseQueryResultToAuthorCourseWithTagsDto(AuthorCourseQueryResult courseQueryResult);

	@Mapping(target = "author", ignore = true)
	@Mapping(target = "authorCourses", ignore = true)
	@Mapping(target = "duration", ignore = true)
	@Mapping(target = "rating", ignore = true)
	@Mapping(target = "lectures", ignore = true)
	@Mapping(target = "tags", ignore = true)
	@Mapping(target = "review", ignore = true)
	@Mapping(target = "ratingCount", ignore = true)
	@Mapping(target = "progress", ignore = true)
	CourseFullInfoDto courseToCourseFullInfoDto(Course course);

    @Mapping(target = "members", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "rating",
            expression =
                    "java(CourseMapper.calculateRating(course.getAllReactions(), course.getPositiveReactions()))"
    )
    @Mapping(target = "ratingCount", source = "allReactions")
    CourseDetailsDto courseDetailsResultToCourseDetailsDto(CourseDetailsQueryResult course);

    @Mapping(target="authorId", expression = "java(course.getAuthor().getId())")
	@Mapping(target="authorName", expression = "java(course.getAuthor().getFullName())")
	@Mapping(target="duration", expression = "java(course.getLectures().stream().map(l->l.getDuration()).reduce(0, (a,b) -> a+b))")
    @Mapping(target="rating", expression = "java(CourseMapper.calculateRating(course.getReactions().size(), course.getReactions().stream().map(r->r.getReaction()).reduce(0,(a,b)->a+b)))")
	FavouriteCourseResponseDto courseToFavouriteCourseResponseDto(Course course);
}
