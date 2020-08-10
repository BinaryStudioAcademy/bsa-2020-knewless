package com.knewless.core.lecture.homework.model;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.lecture.model.Lecture;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "homeworks")
public class Homework extends BaseEntity {
    @Column(name = "description")
    private String description;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
}
