package com.knewless.core.course.courseReaction.model;

import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseRating;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "course_reactions")
public class CourseReaction extends BaseRating {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "course_id")
    private Course course;
}
