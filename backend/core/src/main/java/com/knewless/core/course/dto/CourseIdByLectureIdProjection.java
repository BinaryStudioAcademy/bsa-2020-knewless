package com.knewless.core.course.dto;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface CourseIdByLectureIdProjection {
    @Value("#{target.course_id}")
    String getId();
}
