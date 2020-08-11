package com.knewless.core.security.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class LoginRequest {
    @Email
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
