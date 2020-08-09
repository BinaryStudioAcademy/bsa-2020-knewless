package com.knewless.core.notification;

import com.knewless.core.notification.model.Notification;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    @Query("select n from Notification n where n.user.id = :userId and n.isRead = false order by n.createdAt")
    List<Notification> findUsersUnreadNotifications(UUID userId);

    @Query("select n from Notification n where n.user.id = :userId order by n.isRead desc, n.createdAt ")
    List<Notification> findAllByUser(UUID userId);

    @Transactional
    @Modifying
    void deleteById(UUID id);

    @Transactional
    @Modifying
    @Query("update Notification n set n.isRead = true where n.id = :notificationId")
    void readNotification(UUID notificationId);

    @Query("select n from Notification n where n.user.id = :userId and n.isRead = true order by n.createdAt")
    List<Notification> getRead(UUID userId, Pageable page);

    @Transactional
    @Modifying
    void deleteAllByUser_Id(UUID id);

    @Transactional
    @Modifying
    @Query("update Notification n set n.isRead = true where n.user.id = :userId")
    void readAllUserNotifications(UUID userId);
}
