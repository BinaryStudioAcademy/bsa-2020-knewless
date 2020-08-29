package com.knewless.core.lecture;

import com.knewless.core.lecture.Dto.FavouriteLectureResponseDto;
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

    @Mapping(target="course", expression = "java(lecture.getCourse().getName())")
    @Mapping(target="author", expression = "java(lecture.getCourse().getAuthor().getFullName())")
    @Mapping(target="image", expression = "java(\"\")")
    @Mapping(target="rating", expression = "java(lecture.getReactions().stream().map(r->r.getIsPositive()).filter(r -> r).collect(java.util.stream.Collectors.toList()).size())")
    FavouriteLectureResponseDto lectureToFavouriteLectureResponseDto(Lecture lecture);
}
