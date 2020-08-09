package fileprocessor.messaging;

import fileprocessor.videoencoder.VideoEncoderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class MessageReceiver {
    @Autowired
    private VideoEncoderService videoEncoderService;

    @RabbitListener(queues = "${rabbitmq.queue}")
    public void receive(Message message) throws IOException {
        if (message.getType() == MessageType.REQUEST) {
            log.info(" [x] Received '{}'", message);
            videoEncoderService.encode(message.getFolderId(), message.getEntityId());
        }
    }

}
