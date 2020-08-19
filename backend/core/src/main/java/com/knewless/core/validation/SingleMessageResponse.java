package com.knewless.core.validation;

import lombok.Getter;

public class SingleMessageResponse {

    @Getter
    private final String message;

    public SingleMessageResponse(String message) {
        this.message = message;
    }

}
