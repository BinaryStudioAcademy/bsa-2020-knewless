package com.knewless.core.messaging.kafka;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaAdmin;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaTopicConfig {
    @Value(value = "${kafka.bootstrapAddress}")
    private String bootstrapAddress;

    @Value(value = "${kafka.topics.fileprocessor}")
    private String fileProcessorTopic;

    @Value(value = "${kafka.topics.notifications}")
    private String notificationsTopic;

    @Value(value = "${kafka.topics.emailsender}")
    private String emailSenderTopic;

    @Bean
    public KafkaAdmin kafkaAdmin() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapAddress);
        return new KafkaAdmin(configs);
    }

    @Bean
    public NewTopic fileProcessorTopic() {
        return TopicBuilder.name(fileProcessorTopic).build();
    }

    @Bean
    public NewTopic notificationsTopic() {
        return TopicBuilder.name(notificationsTopic).build();
    }

    @Bean
    public NewTopic emailSenderTopic() {
        return TopicBuilder.name(emailSenderTopic).build();
    }
}
