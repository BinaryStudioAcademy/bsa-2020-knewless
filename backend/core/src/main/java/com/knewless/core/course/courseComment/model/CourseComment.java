package com.knewless.core.course.courseComment.model;

import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseComment;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "course_comments")
public class CourseComment extends BaseComment {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "course_id")
    private Course course;
}
