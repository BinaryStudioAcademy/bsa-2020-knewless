package com.knewless.core.auth.Dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SavePasswordDtoResponse {
    private String comment;
    private Boolean isSuccessfull;
}
