package com.knewless.core.history.model;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "histories")
public class History extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    @Column(name = "seconds_watched")
    private int secondsWatched;

    /**
     * Fraction is a part of the video [0, 1]. E.g 0.21, 0.03 etc.
     */
    @Column(name = "fraction_watched")
    private float fractionWatched;
}
