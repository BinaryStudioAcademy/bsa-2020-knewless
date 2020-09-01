package fileprocessor.messaging;

import fileprocessor.videoencoder.VideoEncoderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
public class MessageReceiver {
    @Autowired
    private VideoEncoderService videoEncoderService;

    @KafkaListener(topics = "${kafka.topics.fileprocessor}", groupId = "${kafka.consumer.group}")
    public void listen(Message message) throws IOException {
        log.info(" [x] Received '{}'", message);
        videoEncoderService.encode(message.getFolderId(), message.getEntityId(), message.getUserId());
    }
}
