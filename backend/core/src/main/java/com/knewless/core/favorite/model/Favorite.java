package com.knewless.core.favorite.model;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.db.SourceType;
import com.knewless.core.user.model.User;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "favorites")
public class Favorite extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "source_id")
    private UUID sourceId;

    @Column(name = "source_type")
    @Enumerated(EnumType.STRING)
    private SourceType sourceType;
}
