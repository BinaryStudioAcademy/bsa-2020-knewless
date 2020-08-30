package com.knewless.core.lecture.model;

import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.lecture.homework.model.Homework;
import com.knewless.core.lecture.lectureComment.model.LectureComment;
import com.knewless.core.lecture.lectureReaction.model.LectureReaction;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.model.User;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "lectures")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
public class Lecture extends BaseEntity {
    @Column(name = "name")
    @ToString.Include
    private String name;

    @Column(name = "web_link")
    private String webLink;

    @Column(name = "url_origin")
    private String urlOrigin;

    @Column(name = "url_1080")
    private String url1080;

    @Column(name = "url_720")
    private String url720;

    @Column(name = "url_480")
    private String url480;

    @Column(name = "description")
    private String description;
  
    @Column(name = "preview_image")
    private String previewImage;

    @Column(name = "duration")
    private int duration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "homework_id")
    private Homework homework;

    @Builder.Default
    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LectureComment> comments = List.of();

    @Builder.Default
    @OneToMany(mappedBy = "lecture", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LectureReaction> reactions = List.of();

    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinTable(name = "lecture_tag",
            joinColumns = @JoinColumn(name = "lecture_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = Set.of();
}