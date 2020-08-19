package com.knewless.core.validation;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.Errors;

import java.util.stream.Collectors;

public interface ValidationMessageCreator {

    static String createString(Errors errors, String delimiter) {
        return errors.getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(delimiter));
    }

}
