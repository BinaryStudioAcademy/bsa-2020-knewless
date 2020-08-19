package com.knewless.core.exception.handling;

import org.springframework.http.HttpStatus;

public interface ApiError {
	HttpStatus getStatus();
	String getMessage();
}
