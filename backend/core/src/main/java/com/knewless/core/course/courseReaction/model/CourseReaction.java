package com.knewless.core.course.courseReaction.model;

import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseReaction;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "course_reactions")
public class CourseReaction extends BaseReaction {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "course_id")
    private Course course;
}
