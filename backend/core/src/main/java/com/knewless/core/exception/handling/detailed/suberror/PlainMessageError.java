package com.knewless.core.exception.handling.detailed.suberror;

import lombok.Data;

@Data
public class PlainMessageError implements ApiSubError {
	private String message;
	private String debugMessage;

	public static PlainMessageError of(Throwable ex) {
		var error = new PlainMessageError();
		error.setMessage(ex.getMessage());
		error.setDebugMessage(ex.getLocalizedMessage());
		return error;
	}
}
