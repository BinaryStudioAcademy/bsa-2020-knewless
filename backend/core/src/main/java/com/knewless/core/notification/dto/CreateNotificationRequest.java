package com.knewless.core.notification.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CreateNotificationRequest {
	private NotificationDto notification;
	private UUID userId;
}
