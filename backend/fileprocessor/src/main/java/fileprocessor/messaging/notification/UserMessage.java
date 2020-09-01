package fileprocessor.messaging.notification;

import fileprocessor.notification.dto.NotificationDto;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
public class UserMessage {
    private UUID receiverId;
    private NotificationDto body;
    private UserMessageType type;
}
