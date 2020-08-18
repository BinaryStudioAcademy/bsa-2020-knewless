package com.knewless.core.subscription;

import com.knewless.core.db.SourceType;
import com.knewless.core.messaging.MessageSender;
import com.knewless.core.messaging.userMessage.UserMessage;
import com.knewless.core.messaging.userMessage.UserMessageType;
import com.knewless.core.notification.NotificationService;
import com.knewless.core.notification.dto.NotificationDto;
import com.knewless.core.subscription.dto.SubscriptionDto;
import com.knewless.core.subscription.mapper.SubscriptionMapper;
import com.knewless.core.subscription.model.Subscription;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class SubscriptionService {
    @Autowired
    SubscriptionRepository subscriptionRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MessageSender messageSender;
    @Autowired
    NotificationService notificationService;

    public void subscribe(SubscriptionDto subscription) {
        User user = userRepository.findById(subscription.getUserId()).get();
        List<Subscription> result = subscriptionRepository.findBySource(subscription.getUserId(), subscription.getSourceId(), subscription.getSourceType());
        if (result.isEmpty()) {
            subscriptionRepository.save(SubscriptionMapper.fromDto(subscription, user));
        }

    }

    public boolean isSubscribe(UUID userId, UUID sourceId, SourceType sourceType) {
        List<Subscription> result = subscriptionRepository.findBySource(userId, sourceId, sourceType);
        return !result.isEmpty();
    }

    public void unsubscribe(SubscriptionDto subscription) {
        System.out.println("unsubscribe");
        subscriptionRepository.deleteBySource(subscription.getUserId(), subscription.getSourceId(), subscription.getSourceType());
    }

    public void notifySubscribers(UUID subscriberId, SourceType subscriberType, UUID sourceId, SourceType sourceType, String message) {
        NotificationDto build = NotificationDto.builder()
                .id(UUID.randomUUID())
                .sourceId(sourceId.toString())
                .date(new Date())
                .isRead(false)
                .text(message)
                .sourceType(sourceType.toString())
                .build();
        List<UUID> subscribers = subscriptionRepository.findAllBySource(subscriberId, subscriberType);
        for (UUID subscriber : subscribers) {
            notificationService.createNotification(build, subscriber);
            UserMessage userMessage = new UserMessage();
            userMessage.setReceiverId(subscriber.toString());
            userMessage.setBody(build);
            userMessage.setType(UserMessageType.PERSONAL);
            messageSender.sendToUser(userMessage);
        }
    }
}
