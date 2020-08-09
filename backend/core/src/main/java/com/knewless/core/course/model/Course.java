package com.knewless.core.course.model;

import com.knewless.core.author.model.Author;
import com.knewless.core.category.model.Category;
import com.knewless.core.course.courseComment.model.CourseComment;
import com.knewless.core.course.courseReaction.model.CourseReaction;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.model.Path;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@EqualsAndHashCode(callSuper = true)
@Table(name = "courses")
public class Course extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "level")
    private int level;

    @Column(name = "image")
    private String image;

    @Column(name = "released_date")
    private Date releasedDate;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "author_id")
    private Author author;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
    @JoinTable(name = "course_path",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "path_id"))
    private List<Path> paths = List.of();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CourseComment> comments = List.of();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CourseReaction> reactions = List.of();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Lecture> lectures = List.of();
}
