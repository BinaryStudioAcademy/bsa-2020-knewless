package com.knewless.core.lecture.lectureComment;

import com.knewless.core.lecture.lectureComment.dto.LectureCommentDto;
import com.knewless.core.lecture.lectureComment.model.LectureComment;
import com.knewless.core.user.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = UserMapper.class)
public interface LectureCommentMapper {
	LectureCommentMapper MAPPER = Mappers.getMapper(LectureCommentMapper.class);
	
	@Mapping(source = "lecture.id", target = "lectureId")
	LectureCommentDto commentToDto(LectureComment comment);
}
