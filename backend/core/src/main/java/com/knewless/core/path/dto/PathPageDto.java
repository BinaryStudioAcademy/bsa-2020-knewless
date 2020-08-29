package com.knewless.core.path.dto;

import com.knewless.core.author.dto.AuthorMainInfoDto;
import com.knewless.core.author.dto.AuthorPublicDto;
import com.knewless.core.course.dto.CourseDetailsDto;
import com.knewless.core.course.dto.CourseWithMinutesDto;
import com.knewless.core.tag.dto.TagDto;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class PathPageDto {
    private UUID id;
    private UUID userId;
    private String name;
    private String description;
    private List<CourseDetailsDto> courses;
    private AuthorMainInfoDto author;
    private List<AuthorMainInfoDto> authors;
    private List<TagDto> tags;
    private String imageSrc;
    private long duration;

}
