package fileprocessor.notification.dto;

import fileprocessor.notification.model.Notification;
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
    private UUID id;
    private String sourceType;
    private String sourceId;
    private boolean isRead;
    private Date date;

    public static NotificationDto fromEntity(Notification notification){
        return NotificationDto.builder()
                .id(notification.getId())
                .text(notification.getText())
                .sourceType(notification.getSourceType().toString())
                .sourceId(notification.getSourceId().toString())
                .isRead(notification.isRead())
                .date(notification.getCreatedAt())
                .build();
    }
}
