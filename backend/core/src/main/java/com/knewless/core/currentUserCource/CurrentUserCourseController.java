package com.knewless.core.currentUserCource;

import com.knewless.core.course.dto.CourseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/course/continue")
public class CurrentUserCourseController {
    @Autowired
    CurrentUserCourseService currentUserCourseService;

    @GetMapping("/{id}")
    private List<CourseDto> getContinueLearningCourses(@PathVariable("id") UUID userId) {
        return currentUserCourseService.getContinueLearningCourses(userId);
    }
}
