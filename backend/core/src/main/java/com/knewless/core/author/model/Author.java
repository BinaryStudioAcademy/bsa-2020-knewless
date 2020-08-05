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

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "school_id")
    private School school;
}
