package com.knewless.core.student.model;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "students")
public class Student extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "job")
    private String job;

    @Column(name = "location")
    private String location;

    @Column(name = "company")
    private String company;

    @Column(name = "website")
    private String website;

    @Column(name = "biography")
    private String biography;

    @Column(name = "direction")
    private String direction;

    @Column(name = "experience")
    private int experience;

    @Column(name = "level")
    private String level;

    @Column(name = "industry")
    private String industry;

    @Column(name = "role")
    private String role;

    @Column(name = "employment")
    private String employment;

    @Column(name = "education")
    private String education;

    @Column(name = "year")
    private int year;

}
