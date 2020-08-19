package com.knewless.core.exception.handling;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Data
public abstract class BasicApiError implements ApiError {

	private int statusCode;
	private HttpStatus status;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss Z")
	private ZonedDateTime timestamp;
	private String message;

	public BasicApiError() {
		this.timestamp = ZonedDateTime.now();
	}

	public BasicApiError(HttpStatus status) {
		this();
		this.status = status;
		this.statusCode = status.value();
		this.message = "Unexpected error";
	}

	public BasicApiError(HttpStatus status, Throwable ex) {
		this(status, ex.getMessage());
	}

	public BasicApiError(HttpStatus status, String message) {
		this(status);
		this.message = message;
	}
}
