package com.knewless.core.course;

import com.knewless.core.course.dto.CreateCourseRequestDto;
import com.knewless.core.course.dto.CreateCourseResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping
    private CreateCourseResponseDto createCourse(@RequestBody CreateCourseRequestDto request) {
        return null;
    }
}
