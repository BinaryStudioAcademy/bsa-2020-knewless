package com.knewless.core.notification.mapper;

import com.knewless.core.db.SourceType;
import com.knewless.core.notification.dto.NotificationDto;
import com.knewless.core.notification.model.Notification;
import com.knewless.core.user.model.User;

import java.util.UUID;

public class NotificationMapper {
    public static Notification fromDto(NotificationDto notification, User user) {
        Notification result = new Notification();
        result.setUser(user);
        result.setSourceId(UUID.fromString(notification.getSourceId()));
        result.setSourceType(SourceType.valueOf(notification.getSourceType()));
        result.setText(notification.getText());
        result.setRead(notification.isRead());
        result.setCreatedAt(notification.getDate());
        return result;
    }
}
