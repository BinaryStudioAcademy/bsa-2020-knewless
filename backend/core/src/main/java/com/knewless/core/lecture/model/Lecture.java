package com.knewless.core.lecture.model;

import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.lecture.homework.model.Homework;
import com.knewless.core.lecture.lectureComment.model.LectureComment;
import com.knewless.core.lecture.lectureReaction.model.LectureReaction;
import com.knewless.core.tag.model.Tag;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "lectures")
public class Lecture extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "source_url")
    private String sourceUrl;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "duration")
    private int duration;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "homework_id")
    private Homework homework;

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LectureComment> comments = List.of();

    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LectureReaction> reactions = List.of();

    @ManyToMany(mappedBy = "lectures")
    private Set<Tag> tags = Set.of();
}
