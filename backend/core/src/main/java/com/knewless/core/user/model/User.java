package com.knewless.core.user.model;

import com.knewless.core.achievement.model.Achievement;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.notification.model.Notification;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.role.model.Role;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "users")
public class User extends BaseEntity {

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "password")
    private String password;

    @Column(name = "verified_email")
    private boolean isEmailVerified;

    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToMany(mappedBy = "users")
    private Set<Achievement> achievements = Set.of();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL)
    List<Notification> notifications;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinTable(name = "user_tag",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = Set.of();
}
