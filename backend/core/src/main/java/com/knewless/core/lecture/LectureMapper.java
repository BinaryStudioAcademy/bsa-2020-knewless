package com.knewless.core.lecture;

import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.lecture.model.Lecture;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface LectureMapper {
    LectureMapper MAPPER = Mappers.getMapper(LectureMapper.class);

    @Mapping(target = "timeSeconds", source = "duration")
    ShortLectureDto lectureToShortLectureDto(Lecture lecture);
}
