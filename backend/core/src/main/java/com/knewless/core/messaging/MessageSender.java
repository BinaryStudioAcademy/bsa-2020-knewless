package com.knewless.core.messaging;

import com.knewless.core.messaging.emailMessage.EmailMessage;
import com.knewless.core.messaging.userMessage.UserMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MessageSender {

    @Value("${rabbitmq.exchange}")
    private String exchange;

    @Value("${rabbitmq.routing-key}")
    private String routingKey;

    @Value("${rabbitmq.routing-key-user}")
    private String routingKeyUser;

    @Value("${rabbitmq.routing-key-mail}")
    private String routingKeyEmail;

    private final RabbitTemplate template;

    @Autowired
    public MessageSender(RabbitTemplate template) {
        this.template = template;
    }

    public void sendToFileProcessor(Message message) {
        log.info(" [x] Sending message...");
        this.template.convertAndSend(exchange, routingKey, message);
        log.info(" [x] Sent '{}'", message);
    }

    public void sendToUser(UserMessage message) {
        log.info(" [x] Sending message...");
        this.template.convertAndSend(exchange, routingKeyUser, message);
        log.info(" [x] Sent '{}'", message);
    }

    public void sendEmail(EmailMessage message) {
        log.info(" [x] Sending message...");
        this.template.convertAndSend(exchange, routingKeyEmail, message);
        log.info(" [x] Sent '{}'", message);
    }

}
