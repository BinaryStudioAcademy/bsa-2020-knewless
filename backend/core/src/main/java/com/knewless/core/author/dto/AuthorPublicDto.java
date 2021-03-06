package com.knewless.core.author.dto;

import com.knewless.core.course.dto.AuthorCourseWithTagsDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorPublicDto {
    private UUID id;
    private UUID userId;
    private String firstName;
    private String lastName;
    private String avatar;
    private String biography;
    private String schoolName;
    private String schoolId;
    private Integer numberOfSubscribers;
    private List<AuthorCourseWithTagsDto> courses;
    private List<AuthorArticlesDto> articles;
    private Boolean printFollowButton;
}
