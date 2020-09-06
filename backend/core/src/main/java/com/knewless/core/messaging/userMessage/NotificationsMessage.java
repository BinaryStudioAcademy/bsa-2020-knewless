package com.knewless.core.messaging.userMessage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationsMessage {
//    private UUID receiverId; // If you need to send everyone, just put null
    private String receiverId;
    private Object body;
    private UserMessageType type;
}
