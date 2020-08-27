package com.knewless.core.db;

import com.knewless.core.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Data
@EqualsAndHashCode(callSuper = true)
@MappedSuperclass
public abstract class BaseRating extends BaseEntity {
    @Column(name = "reaction")
    private int reaction;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;
}
