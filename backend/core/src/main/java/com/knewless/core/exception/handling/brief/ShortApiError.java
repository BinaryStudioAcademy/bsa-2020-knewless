package com.knewless.core.exception.handling.brief;

import com.knewless.core.exception.handling.ApiError;
import com.knewless.core.exception.handling.BasicApiError;
import org.springframework.http.HttpStatus;

public class ShortApiError extends BasicApiError {

	public ShortApiError(HttpStatus status) {
		super(status);
	}

	public ShortApiError(HttpStatus status, String message) {
		super(status, message);
	}

	public static ApiError of(HttpStatus status, String message, Exception ignored) {
		return new ShortApiError(status, message);
	}

	public static ApiError of(HttpStatus status, Exception ignored) {
		return new ShortApiError(status);
	}
}
