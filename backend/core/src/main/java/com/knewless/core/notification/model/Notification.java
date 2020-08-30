package com.knewless.core.notification.model;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.db.SourceType;
import com.knewless.core.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@Table(name = "notifications")
public class Notification extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "source_id")
    @EqualsAndHashCode.Include
    @ToString.Include
    private UUID sourceId;

    @Column(name = "source_type")
    @Enumerated(EnumType.STRING)
    private SourceType sourceType;

    @Column(name = "text")
    private String text;

    @Column(name = "is_read")
    private boolean isRead;
}
