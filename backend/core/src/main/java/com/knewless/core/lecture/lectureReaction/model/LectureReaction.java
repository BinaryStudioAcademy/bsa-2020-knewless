package com.knewless.core.lecture.lectureReaction.model;

import com.knewless.core.db.BaseReaction;
import com.knewless.core.lecture.model.Lecture;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "lecture_reactions")
public class LectureReaction extends BaseReaction {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
}
