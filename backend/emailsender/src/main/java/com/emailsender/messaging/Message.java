package com.emailsender.messaging;

import lombok.Data;

import java.io.Serializable;

@Data
public class Message implements Serializable {
    private String link;
    private String email;
    private EmailType type;
}
