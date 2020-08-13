package com.knewless.core.author.dto;

import com.knewless.core.article.model.Article;
import com.knewless.core.course.dto.AuthorCourseQueryResult;
import com.knewless.core.course.model.Course;
import com.knewless.core.tag.dto.ArticleTagDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorPublicDto {
    private String firstName;
    private String lastName;
    private String avatar;
    private String biography;
    private String schoolName;
    private String schoolId;
    private Integer numberOfSubscribers;
    private List<AuthorCourseQueryResult> courses;
    private List<AuthorArticlesDto> articles;
    private Boolean printFollowButton;

}
