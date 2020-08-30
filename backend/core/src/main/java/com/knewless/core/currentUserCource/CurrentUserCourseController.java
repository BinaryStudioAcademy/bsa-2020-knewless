package com.knewless.core.currentUserCource;

import com.knewless.core.course.dto.CourseDetailsDto;
import com.knewless.core.course.dto.CourseDto;
import com.knewless.core.currentUserCource.dto.CurrentUserCourseDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/course/continue")
public class CurrentUserCourseController {

    private final CurrentUserCourseService currentUserCourseService;

    @Autowired
    public CurrentUserCourseController(CurrentUserCourseService currentUserCourseService) {
        this.currentUserCourseService = currentUserCourseService;
    }

    @GetMapping("/{id}")
    private List<CourseDto> getContinueLearningCourses(@PathVariable("id") UUID userId) {
        return currentUserCourseService.getContinueLearningCourses(userId);
    }

    @GetMapping()
    private List<CourseDetailsDto> getContinueLearningCoursesByUser(@CurrentUser UserPrincipal userPrincipal) {
        return currentUserCourseService.getCurrentCourses(userPrincipal.getId());
    }

    @PostMapping("/start")
    public Optional<CurrentUserCourseDto> startCourse(@CurrentUser UserPrincipal userPrincipal,
                                                      @RequestBody CurrentUserCourseDto course) {
        course.setUserId(userPrincipal.getId());
        return currentUserCourseService.startCourse(course);

    }

}
