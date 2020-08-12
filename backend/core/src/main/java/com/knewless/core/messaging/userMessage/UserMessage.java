package com.knewless.core.messaging.userMessage;

import com.knewless.core.notification.dto.NotificationDto;
import lombok.Data;

import java.util.UUID;

@Data
public class UserMessage {
//    private UUID receiverId; // If you need to send everyone, just put null
    private String receiverId;
    private NotificationDto body;
    private UserMessageType type;
}
