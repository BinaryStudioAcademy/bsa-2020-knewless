package com.knewless.core.messaging;

import com.knewless.core.messaging.emailMessage.EmailMessage;
import com.knewless.core.messaging.userMessage.NotificationsMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MessageSender {
    @Value(value = "${kafka.topics.fileprocessor}")
    private String fileProcessorTopic;
    @Autowired
    private KafkaTemplate<String, Message> fileProcessorTemplate;

    @Value(value = "${kafka.topics.notifications}")
    private String notificationsTopic;
    @Autowired
    private KafkaTemplate<String, NotificationsMessage> notificationsTemplate;

    @Value(value = "${kafka.topics.emailsender}")
    private String emailSenderTopic;
    @Autowired
    private KafkaTemplate<String, EmailMessage> emailSenderTemplate;
    
    public void sendToFileProcessor(Message message) {
        log.info(" [x] Sending message...");
        this.fileProcessorTemplate.send(fileProcessorTopic, message);
        log.info(" [x] Sent '{}'", message);
    }

    public void notifyUser(NotificationsMessage message) {
        log.info(" [x] Sending message...");
        this.notificationsTemplate.send(notificationsTopic, message);
        log.info(" [x] Sent '{}'", message);
    }

    public void sendEmail(EmailMessage message) {
        log.info(" [x] Sending message...");
        this.emailSenderTemplate.send(emailSenderTopic, message);
        log.info(" [x] Sent '{}'", message);
    }
}
