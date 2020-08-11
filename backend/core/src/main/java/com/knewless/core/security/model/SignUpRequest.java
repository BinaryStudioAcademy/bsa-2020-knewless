package com.knewless.core.security.model;


import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class SignUpRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
