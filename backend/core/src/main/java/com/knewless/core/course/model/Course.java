package com.knewless.core.course.model;

import com.knewless.core.author.model.Author;
import com.knewless.core.category.model.Category;
import com.knewless.core.course.courseComment.model.CourseComment;
import com.knewless.core.course.courseReaction.model.CourseReaction;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.model.Path;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@Table(name = "courses")
public class Course extends BaseEntity {
    
    public Course(UUID id) {
        this.setId(id);
    }
    
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "level")
    @Enumerated(EnumType.STRING)
    private Level level;

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
    
    @Builder.Default
    @ManyToMany(mappedBy = "courses", cascade = CascadeType.REFRESH)
    private List<Path> paths = List.of();
    
    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CourseComment> comments = List.of();
    
    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CourseReaction> reactions = List.of();

    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Lecture> lectures = List.of();
}

