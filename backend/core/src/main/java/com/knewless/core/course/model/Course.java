package com.knewless.core.course.model;

import com.knewless.core.author.model.Author;
import com.knewless.core.comments.CommentableEntity;
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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "courses")
public class Course extends BaseEntity implements CommentableEntity {

    @Column(name = "name")
    @ToString.Include
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
    @OneToMany(targetEntity = Lecture.class, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private List<Lecture> lectures = List.of();

    @Column
    private String overview;

    public Course(UUID id) {
        this.setId(id);
    }
    
    @Override
    public UUID getNotifiedUserId() {
        return author.getUser().getId();
    }
}

