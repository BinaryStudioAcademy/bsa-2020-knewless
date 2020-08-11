package com.knewless.core.course.dto;

import com.knewless.core.lecture.dto.LectureToPlayerDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseToPlayerDto {
    private String courseName;
    private String courseId;
    private String authorName;
    private String authorId;
    private List<LectureToPlayerDto> lectures;
}
