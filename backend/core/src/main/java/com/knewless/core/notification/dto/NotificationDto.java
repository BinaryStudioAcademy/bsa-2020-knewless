package com.knewless.core.notification.dto;

import com.knewless.core.db.SourceType;
import com.knewless.core.notification.model.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Builder
@AllArgsConstructor
@Data
public class NotificationDto {
    private String text;
    private String link;
    private String sourceName;
    private UUID id;
    private boolean isRead;
    private Date date;

    public static NotificationDto fromEntity(Notification notification){
        return NotificationDto.builder()
                .sourceName(notification.getSourceName())
                .id(notification.getId())
                .text(notification.getText())
                .link(notification.getLink())
                .isRead(notification.isRead())
                .date(notification.getCreatedAt())
                .build();
    }
}
