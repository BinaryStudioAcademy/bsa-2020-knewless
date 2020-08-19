package com.knewless.core.security.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {

    @NotNull
    @Size(min = 5, max = 71, message = "Email length must be 5-71(with @) symbols.")
    private String email;

    @NotNull
    @Size(min = 8, max = 32, message = "Password length must be 8-32 symbols.")
    private String password;

}
