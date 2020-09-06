package com.knewless.core.notification;

import com.knewless.core.notification.dto.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("notification")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("unread")
    public List<NotificationDto> getUsersUnreadNotifications(@RequestParam("userId") UUID userId) {
        return notificationService.getUnreadNotifications(userId);
    }

    @GetMapping("init")
    public List<NotificationDto> getInitialNotifications(@RequestParam("userId") UUID userId) {
        return notificationService.getInitNotifications(userId);
    }

    @PutMapping("read")
    public void readNotification(@RequestParam("id") UUID notificationId) {
        notificationService.setNotificationRead(notificationId);
    }

    @DeleteMapping
    public void deleteNotification(@RequestParam("id") UUID id) {
        notificationService.deleteNotification(id);
    }

    @DeleteMapping("all")
    public void deleteAllUsersNotifications(@RequestParam("userId") UUID userId) {
        notificationService.deleteAllByUserId(userId);
    }

    @PutMapping("read-all")
    public void readAllNotifications(@RequestParam("userId") UUID userId) {
        notificationService.readAllUserNotifications(userId);
    }

    @GetMapping("all")
    public List<NotificationDto> getAllUserNotifications(@RequestParam("userId") UUID userId) {
        return notificationService.getAll(userId);
    }
}
