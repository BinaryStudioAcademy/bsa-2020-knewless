package com.knewless.core.currentUserCource.mapper;

import com.knewless.core.currentUserCource.dto.CurrentUserCourseDto;
import com.knewless.core.currentUserCource.model.CurrentUserCourse;

public class CurrentUserCourseMapper {
    public static CurrentUserCourseDto fromEntity(CurrentUserCourse course) {
        CurrentUserCourseDto result = new CurrentUserCourseDto();
        result.setId(course.getId());
        result.setUserId(course.getUser().getId());
        result.setCourseId(course.getCourse().getId());
        return result;
    }
}
