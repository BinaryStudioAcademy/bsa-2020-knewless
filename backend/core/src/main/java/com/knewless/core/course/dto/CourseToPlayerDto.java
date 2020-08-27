package com.knewless.core.course.dto;

import com.knewless.core.lecture.dto.LectureDto;
import com.knewless.core.lecture.dto.LectureToPlayerDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseToPlayerDto {
    private String id;
    private String name;
    private AuthorToPlayerProjection author;
    private List<LectureDto> lectures;
    private boolean reviewed;
}
