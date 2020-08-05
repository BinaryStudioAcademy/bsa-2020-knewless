package com.knewless.core.lecture.lectureComment.model;

import com.knewless.core.db.BaseComment;
import com.knewless.core.lecture.model.Lecture;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "lecture_comments")
public class LectureComment extends BaseComment {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
}
