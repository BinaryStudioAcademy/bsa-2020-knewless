package com.knewless.core.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EmailNotVerifiedException extends RuntimeException {
    private String message;

    @Override
    public String getMessage() {
        return message;
    }

    public EmailNotVerifiedException (String message) {
        super();
        this.message = message;
    }
}
