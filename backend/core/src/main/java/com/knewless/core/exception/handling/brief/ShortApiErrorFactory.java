package com.knewless.core.exception.handling.brief;

import com.knewless.core.exception.handling.ApiError;
import com.knewless.core.exception.handling.ApiErrorFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
@Profile("PROD")
public class ShortApiErrorFactory implements ApiErrorFactory {
	@Override
	public ApiError create(HttpStatus status, String message, Exception ex) {
		return ShortApiError.of(status, message, ex);
	}

	@Override
	public ApiError create(HttpStatus status, Exception ex) {
		return ShortApiError.of(status, ex);
	}
}
