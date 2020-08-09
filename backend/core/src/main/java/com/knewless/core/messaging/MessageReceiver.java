package com.knewless.core.messaging;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MessageReceiver {

    @RabbitListener(queues = "${rabbitmq.queue.resp}")
    public void receive(Message message) {
        if (message.getType() == MessageType.RESPONSE) {
            log.info(" [x] Received '{}'", message);
        }
    }

}
