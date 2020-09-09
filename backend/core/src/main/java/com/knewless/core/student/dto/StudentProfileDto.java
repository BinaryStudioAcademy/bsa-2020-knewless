package com.knewless.core.student.dto;

import com.knewless.core.course.dto.CourseProfileDto;
import com.knewless.core.dailyProgress.dto.ActivityDto;
import lombok.Data;

import java.util.List;

@Data
public class StudentProfileDto {
    private int totalContentWatched;
    private List<CourseProfileDto> courses;
    private List<StudentSubscriptionDto> subscriptions;
    private List<ActivityDto> activity;
}
