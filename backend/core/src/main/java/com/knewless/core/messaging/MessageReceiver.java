package com.knewless.core.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MessageReceiver {

    @RabbitListener(queues = "${rabbitmq.queue}")
    public void receive(String message) {
        log.info(" [x] Received '{}'", message);
    }

}
