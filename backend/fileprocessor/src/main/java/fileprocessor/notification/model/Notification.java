package fileprocessor.notification.model;

import fileprocessor.db.BaseEntity;
import fileprocessor.db.SourceType;
import fileprocessor.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "notifications")
public class Notification extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "source_id")
    private UUID sourceId;

    @Column(name = "source_type")
    @Enumerated(EnumType.STRING)
    private SourceType sourceType;

    @Column(name = "text")
    private String text;

    @Column(name = "is_read")
    private boolean isRead;
}
