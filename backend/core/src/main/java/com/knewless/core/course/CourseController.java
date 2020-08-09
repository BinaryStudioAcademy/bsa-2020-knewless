package com.knewless.core.course;

import com.knewless.core.course.dto.CreateCourseRequestDto;
import com.knewless.core.course.dto.CreateCourseResponseDto;
import com.knewless.core.lecture.Dto.ShortLectureDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping("/lectures/user/{id}")
    public List<ShortLectureDto> getLecturesByUserId(@PathVariable UUID id) {
        return courseService.getLecturesByUserId(id);
    }

    @PostMapping
    private CreateCourseResponseDto createCourse(@RequestBody CreateCourseRequestDto request) {
        return courseService.createCourse(request);
    }
}
