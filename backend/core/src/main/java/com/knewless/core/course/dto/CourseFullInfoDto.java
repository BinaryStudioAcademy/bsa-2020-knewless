package com.knewless.core.course.dto;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorMainInfoDto;
import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.tag.dto.TagDto;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
public class CourseFullInfoDto {
    private UUID id;
    private String name;
    private String description;
    private String level;
    private String image;
    private Date releasedDate;
    private AuthorMainInfoDto author;
    private List<AuthorCourseDto> authorCourses;
    private List<ShortLectureDto> lectures = List.of();
    private Date updatedAt;
    private long duration;
    private int rating;
    private Set<TagDto> tags;
    private Integer review;
    private int ratingCount;
}
