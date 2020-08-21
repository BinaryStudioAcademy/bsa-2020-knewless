package com.knewless.core.currentUserCource;

import com.knewless.core.course.CourseService;
import com.knewless.core.course.dto.CourseDetailsDto;
import com.knewless.core.course.dto.CourseDetailsQueryResult;
import com.knewless.core.course.dto.CourseDto;
import com.knewless.core.course.dto.CourseWithMinutesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CurrentUserCourseService {
    @Autowired
    CourseService courseService;

    @Autowired
    CurrentUserCourseRepository currentUserCourseRepository;

    public List<CourseDto> getContinueLearningCourses(UUID userId) {
        return currentUserCourseRepository
                .getContinueLearningCoursesId(userId, PageRequest.of(0, 10))
                .stream()
                .map(c -> courseService.getCourseById(c))
                .collect(Collectors.toList());
    }

    public List<CourseWithMinutesDto> getLearningCourses(UUID userId) {
        return currentUserCourseRepository
                .getLearningCoursesId(userId)
                .stream()
                .map(c -> courseService.getCourseWithMinutesById(c))
                .collect(Collectors.toList());
    }

    public List<CourseDetailsDto> getCurrentCourses(UUID userId) {
        return courseService.getUserCourses(userId);
    }

}
