package com.knewless.core.currentUserCource;

import com.knewless.core.course.CourseRepository;
import com.knewless.core.course.CourseService;
import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import com.knewless.core.currentUserCource.dto.CurrentUserCourseDto;
import com.knewless.core.currentUserCource.mapper.CurrentUserCourseMapper;
import com.knewless.core.currentUserCource.model.CurrentUserCourse;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.UserService;
import com.knewless.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CurrentUserCourseService {
    @Autowired
    CourseService courseService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CurrentUserCourseRepository currentUserCourseRepository;

    @Autowired
    CourseRepository courseRepository;

    public List<CourseDto> getContinueLearningCourses(UUID userId) {
        return currentUserCourseRepository
                .getContinueLearningCoursesId(userId, PageRequest.of(0, 10))
                .stream()
                .map(c -> courseService.getCourseById(c))
                .collect(Collectors.toList());
    }

    public List<CourseProfileDto> getLearningCourses(UUID userId) {
        var result = currentUserCourseRepository
                .getLearningCoursesId(userId)
                .stream()
                .map(c -> courseService.getCourseProfileById(c, userId))
                .collect(Collectors.toList());
        return result;
    }

    public List<CourseDetailsDto> getCurrentCourses(UUID userId) {
        return courseService.getUserCourses(userId);
    }

    public Optional<CurrentUserCourseDto> startCourse(CurrentUserCourseDto course) {
        User user = userRepository.findById(course.getUserId()).orElseThrow();
        Course userCourse = courseRepository.findById(course.getCourseId()).orElseThrow();
        Optional<CurrentUserCourse> currentCourse = currentUserCourseRepository.findByUserAndCourse(course.getUserId(), course.getCourseId());
        if (currentCourse.isPresent()) {
            return currentCourse.map(CurrentUserCourseMapper::fromEntity);
        }
        CurrentUserCourse newCourse = new CurrentUserCourse();
        newCourse.setCourse(userCourse);
        newCourse.setUser(user);
        return Optional.of(currentUserCourseRepository.save(newCourse)).map(CurrentUserCourseMapper::fromEntity);
    }
}
