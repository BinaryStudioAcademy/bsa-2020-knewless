package com.knewless.core.notification;

import com.knewless.core.notification.dto.CreateNotificationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("notification")
@Profile("DEV")
public class DevNotificationController {
	@Autowired
	private NotificationService notificationService;
	@Value("${test.notification.token}")
	private String secret;
	
	@PutMapping("create")
	public void createNotification(@RequestBody CreateNotificationRequest request,
								   @RequestHeader(name = "X-CONTROL-TOKEN") String token) {
		if (token.equals(secret)) {
			notificationService.createAndSendNotification(request.getNotification(), request.getUserId());
		} else {
			throw new AccessDeniedException("Fock u");
		}
	}
}
