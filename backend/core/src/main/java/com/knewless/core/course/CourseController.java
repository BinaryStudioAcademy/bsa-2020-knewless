package com.knewless.core.course;

import com.knewless.core.course.dto.CourseDto;
import com.knewless.core.course.dto.CreateCourseRequestDto;
import com.knewless.core.course.dto.CreateCourseResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping("/recommended/{id}")
    private List<CourseDto> getRecommendedCourses(@PathVariable("id") UUID id) {
        return courseService.getRecommendedCourses(id);
    }

    @GetMapping("/{id}")
    private CourseDto getCourseById(@PathVariable("id") UUID id) {
        return courseService.getCourseById(id);
    }

    @PostMapping
    private CreateCourseResponseDto createCourse(@RequestBody CreateCourseRequestDto request) {
        return null;
    }
}
