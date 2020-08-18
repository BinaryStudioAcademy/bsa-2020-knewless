package com.emailsender.messaging;

import lombok.Data;

import java.util.UUID;

@Data
public class Message {
    private UUID linkId;
    private String email;
    private MessageType type;
}
