package com.knewless.core.subscription.model;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.db.SourceType;
import com.knewless.core.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "subscriptions")
public class Subscription extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "source_id")
    private UUID sourceId;

    @Column(name = "source_type")
    @Enumerated(EnumType.STRING)
    private SourceType sourceType;
}
