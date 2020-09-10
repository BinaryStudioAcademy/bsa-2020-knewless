package com.knewless.core.currentUserCource;

import com.knewless.core.course.CourseRepository;
import com.knewless.core.course.CourseService;
import com.knewless.core.course.dto.CourseDetailsDto;
import com.knewless.core.course.dto.CourseDto;
import com.knewless.core.course.dto.CourseProfileDto;
import com.knewless.core.currentUserCource.dto.CurrentUserCourseDto;
import com.knewless.core.currentUserCource.mapper.CurrentUserCourseMapper;
import com.knewless.core.currentUserCource.model.CurrentUserCourse;
import com.knewless.core.history.WatchHistoryService;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CurrentUserCourseService {

    private final CourseService courseService;

    private final UserRepository userRepository;

    private final CurrentUserCourseRepository currentUserCourseRepository;

    private final CourseRepository courseRepository;

    private final WatchHistoryService watchHistoryService;

    @Autowired
    public CurrentUserCourseService(CourseService courseService, UserRepository userRepository,
                                    CurrentUserCourseRepository currentUserCourseRepository,
                                    CourseRepository courseRepository, WatchHistoryService watchHistoryService) {
        this.courseService = courseService;
        this.userRepository = userRepository;
        this.currentUserCourseRepository = currentUserCourseRepository;
        this.courseRepository = courseRepository;
        this.watchHistoryService = watchHistoryService;
    }

    public List<CourseDto> getContinueLearningCourses(UUID userId) {
        return currentUserCourseRepository
                .getContinueLearningCoursesId(userId, Pageable.unpaged())
                .stream()
                .filter(id -> watchHistoryService.getProgressByCourse(userId, id) < 100)
                .limit(10)
                .map(courseService::getCourseById)
                .collect(Collectors.toList());
    }

    public List<CourseProfileDto> getLearningCourses(UUID userId) {
        return this.currentUserCourseRepository
                .getLearningCoursesId(userId)
                .stream()
                .map(c -> this.courseService.getCourseProfileById(c, userId))
                .collect(Collectors.toList());
    }

    public List<CourseDetailsDto> getCurrentCourses(UUID userId) {
        return courseService.getUserCourses(userId);
    }

    public long getCountMembers(UUID courseId) {
        return currentUserCourseRepository.getMembersByCourse(courseId);
    }

    public Optional<CurrentUserCourseDto> startCourse(CurrentUserCourseDto course) {
        var user = userRepository.findById(course.getUserId()).orElseThrow();
        var userCourse = courseRepository.findById(course.getCourseId()).orElseThrow();
        var currentCourse = currentUserCourseRepository.findByUserAndCourse(course.getUserId(), course.getCourseId());
        if (currentCourse.isPresent()) {
            return currentCourse.map(CurrentUserCourseMapper::fromEntity);
        }
        var newCourse = new CurrentUserCourse();
        newCourse.setCourse(userCourse);
        newCourse.setUser(user);
        return Optional.of(currentUserCourseRepository.save(newCourse)).map(CurrentUserCourseMapper::fromEntity);
    }

}
