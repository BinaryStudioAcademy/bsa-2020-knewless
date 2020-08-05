package com.knewless.core.messaging;

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

    private final RabbitTemplate template;

    @Autowired
    public MessageSender(RabbitTemplate template) {
        this.template = template;
    }

    public void send(String message) {
        log.info(" [x] Sending message...");
        this.template.convertAndSend(exchange, routingKey, message);
        log.info(" [x] Sent '{}'", message);
    }

}
