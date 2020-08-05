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
}
