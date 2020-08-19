package com.knewless.core.exception.handling.detailed;

import com.knewless.core.exception.handling.BasicApiError;
import com.knewless.core.exception.handling.detailed.suberror.ApiSubError;
import com.knewless.core.exception.handling.detailed.suberror.PlainMessageError;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;


@Data
@EqualsAndHashCode(callSuper = true)
public class DetailedApiError extends BasicApiError {

    private static final int MAX_SUBERROR_DEPTH = 3;
    private String debugMessage;
    private List<ApiSubError> subErrors;

    public DetailedApiError(HttpStatus status, String message) {
        super(status, message);
    }

    public static DetailedApiError of(HttpStatus status, String message, Throwable ex) {
        var error = new DetailedApiError(status, message);
        error.setDebugMessage(ex.getLocalizedMessage());
        error.setSubErrors(extractSubErrors(ex));
        return error;
    }

    public static DetailedApiError of(HttpStatus status, Throwable ex) {
        return of(status, "Unexpected error", ex);
    }

    private static List<ApiSubError> extractSubErrors(Throwable ex) {
        List<ApiSubError> subErrors = new ArrayList<>();
        int depth = MAX_SUBERROR_DEPTH;
        Throwable cause = ex.getCause();
        while (depth > 0) {
            if (cause == null) break;
            subErrors.add(PlainMessageError.of(cause));
            cause = cause.getCause();
            depth--;
        }
        return subErrors;
    }
}

