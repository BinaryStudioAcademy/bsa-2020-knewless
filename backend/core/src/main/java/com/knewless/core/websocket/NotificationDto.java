package com.knewless.core.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class NotificationDto {
    private String text;
    private String link;
    private String sourceType;
}
