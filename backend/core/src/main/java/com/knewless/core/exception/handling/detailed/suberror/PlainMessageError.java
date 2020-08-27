package com.knewless.core.exception.handling.detailed.suberror;

import lombok.Data;
import org.apache.commons.lang3.exception.ExceptionUtils;

@Data
public class PlainMessageError implements ApiSubError {
	private String message;
	private String debugMessage;
	private String stackTrace;

	public static PlainMessageError of(Throwable ex) {
		var error = new PlainMessageError();
		error.setMessage(ex.getMessage());
		error.setDebugMessage(ex.getLocalizedMessage());
		error.setStackTrace(ExceptionUtils.getStackTrace(ex));
		return error;
	}
}
