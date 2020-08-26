package com.knewless.core.auth.Dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VerifyEmailResponseDto {
    private String token;
    private String refresh;
    private boolean isVerified;
}
