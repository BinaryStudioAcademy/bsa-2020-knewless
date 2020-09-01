package fileprocessor.messaging;

import fileprocessor.messaging.notification.UserMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MessageSender {
    @Value(value = "${kafka.topics.notifications}")
    private String notificationsTopic;

    @Autowired
    private KafkaTemplate<String, UserMessage> template;

    public void send(UserMessage message) {
        log.info(" [x] Sending message...");
        this.template.send(notificationsTopic, message);
        log.info(" [x] Sent '{}'", message);
    }

}
