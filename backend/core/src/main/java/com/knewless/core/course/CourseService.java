package com.knewless.core.course;

import com.knewless.core.course.dto.CourseBriefInfoDto;
import com.knewless.core.course.dto.CourseDto;
import com.knewless.core.course.mapper.CourseInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    List<CourseDto> getRecommendedCourses(UUID id) {
        return courseRepository.findRecommendedCoursesId(PageRequest.of(0, 10))
                .stream()
                .map(this::getCourseById)
                .collect(Collectors.toList());
    }

    public CourseDto getCourseById(UUID id) {
        var result = courseRepository.getCourseById(id);
        var course = CourseMapper.MAPPER.courseQueryResultToCourseDto(result);

        course.setRating(result.getAllReactions() == 0
                ? 0
                : Math.round((float) result.getPositiveReactions() /
                result.getAllReactions() * 5));
        course.setLevel(getLevel(result.getLevel()));
        course.setDuration(getDuration(result.getDuration()));
        return course;
    }

    public String getLevel(int level) {
        switch (level) {
            case 0:
                return "Beginner";
            case 1:
                return "Elementary";
            case 2:
                return "Intermediate";
            case 3:
                return "Upper-intermediate";
            case 4:
                return "Advanced";
            case 5:
                return "Proficiency";
            default:
                return "None";
        }
    }

    public String getDuration(long minutes) {
        long hh = minutes / 60;
        long mm = minutes % 60;
        return String.format("%dh %02dm", hh, mm);
    }

}
