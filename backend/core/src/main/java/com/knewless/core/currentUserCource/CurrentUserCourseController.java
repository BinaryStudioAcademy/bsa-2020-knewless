package com.knewless.core.currentUserCource;

import com.knewless.core.course.dto.CourseDetailsDto;
import com.knewless.core.course.dto.CourseDetailsQueryResult;
import com.knewless.core.course.dto.CourseDto;
import com.knewless.core.course.dto.CourseWithMinutesDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
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

    @GetMapping()
    private List<CourseDetailsDto> getContinueLearningCoursesByUser(@CurrentUser UserPrincipal userPrincipal) {
        return currentUserCourseService.getCurrentCourses(userPrincipal.getId());
    }
}
