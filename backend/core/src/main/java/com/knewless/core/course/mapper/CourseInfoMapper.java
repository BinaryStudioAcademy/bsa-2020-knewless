package com.knewless.core.course.mapper;

import com.knewless.core.course.dto.CourseBriefInfoDto;
import com.knewless.core.course.model.Course;

import java.util.List;
import java.util.stream.Collectors;

public interface CourseInfoMapper {

    static CourseBriefInfoDto fromEntity(Course course) {
        final var courseBriefInfoDto = new CourseBriefInfoDto();
        courseBriefInfoDto.setName(course.getName());
        return courseBriefInfoDto;
    }

    static List<CourseBriefInfoDto> fromEntities(List<Course> courses) {
        return courses.stream()
                .map(CourseInfoMapper::fromEntity)
                .collect(Collectors.toUnmodifiableList());
    }

}
