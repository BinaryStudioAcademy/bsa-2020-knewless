package com.knewless.core.messaging;

import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class Message  implements Serializable { // Hi developer, if you need to change this class, don't forget to change the same class at another end connection
    private String folderId;
    private UUID entityId;
    private MessageType type;
}
