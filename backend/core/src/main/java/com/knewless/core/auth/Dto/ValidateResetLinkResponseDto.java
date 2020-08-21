package com.knewless.core.auth.Dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ValidateResetLinkResponseDto {
    private boolean isValidLink;
    private String email;
}
