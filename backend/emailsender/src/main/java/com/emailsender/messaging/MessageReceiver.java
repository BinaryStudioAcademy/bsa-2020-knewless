package com.emailsender.messaging;

import com.emailsender.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class MessageReceiver {
    @Autowired
    private EmailService emailService;

    @RabbitListener(queues = "${rabbitmq.queue}")
    public void receive(Message message) throws IOException {
        if (message.getType() == EmailType.REGISTRATION) {
            log.info(" [x] Received '{}'", message);
            emailService.sendRegisterMessage(message.getEmail(), message.getLink());
        }
        if (message.getType() == EmailType.RESET) {
            log.info(" [x] Received '{}'", message);
            emailService.sendResetMessage(message.getEmail(), message.getLink());
        }
    }
}
