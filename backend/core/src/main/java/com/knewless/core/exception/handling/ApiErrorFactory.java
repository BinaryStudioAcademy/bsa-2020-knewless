package com.knewless.core.exception.handling;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public interface ApiErrorFactory {

	ApiError create(HttpStatus status, String message, Exception ex);

	ApiError create(HttpStatus status, Exception ex);
}
