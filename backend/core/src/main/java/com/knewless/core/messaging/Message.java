package com.knewless.core.messaging;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
public class Message  implements Serializable { // Hi developer, if you need to change this class, don't forget to change the same class at another end connection
    private String folderId;
    private UUID entityId;
    private UUID userId;
}
