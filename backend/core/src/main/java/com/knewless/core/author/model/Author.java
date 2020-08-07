package com.knewless.core.author.model;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.school.model.School;
import com.knewless.core.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "authors")
public class Author extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "location")
    private String location;

    @Column(name = "company")
    private String company;

    @Column(name = "website")
    private String website;

    @Column(name = "biography")
    private String biography;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "school_id")
    private School school;
}
