package com.knewless.core.course.courseComment;

import com.knewless.core.course.courseComment.dto.CourseCommentDto;
import com.knewless.core.course.courseComment.model.CourseComment;
import com.knewless.core.user.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = UserMapper.class)
public interface CourseCommentMapper {
	CourseCommentMapper MAPPER = Mappers.getMapper(CourseCommentMapper.class);
	
	@Mapping(source = "course.id", target = "courseId")
	CourseCommentDto commentToDto(CourseComment courseComment);
}
