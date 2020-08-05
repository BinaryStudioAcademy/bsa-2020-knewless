package com.knewless.core.achievement.model;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "achievements")
public class Achievement extends BaseEntity {
    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private AchievementType name;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinTable(name = "user_achievement",
            joinColumns = @JoinColumn(name = "achievement_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> users = Set.of();
}
