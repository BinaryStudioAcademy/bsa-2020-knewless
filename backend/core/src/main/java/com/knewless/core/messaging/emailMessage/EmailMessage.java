package com.knewless.core.messaging.emailMessage;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailMessage {
    private String link;
    private String email;
    private EmailMessageType type;
}
