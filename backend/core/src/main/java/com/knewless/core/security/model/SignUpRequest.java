package com.knewless.core.security.model;


import lombok.Data;

import javax.validation.constraints.*;

@Data
public class SignUpRequest {

    @NotNull
    @Email(message = "Invalid email.")
    @Size(min = 5, max = 71, message = "Email length must be 5-71(with @) symbols.")
    @Pattern(
            regexp = "^\\w[a-zA-Z0-9.!#$%&\u2019*+/=?^_`{|}~\"-]{0,34}@((\\[?[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}]?)|(([a-zA-Z0-9][a-zA-Z\\-0-9]*\\.)+[a-zA-Z]+))$",
            message = "Only digits, Latin letters and special characters allowed."
    )
    private String email;

    @NotNull
    @Size(min = 8, max = 32, message = "Password length must be 8-32 symbols.")
    @Pattern(
            regexp = "^(?=.*[a-zA-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,32}$",
            message = "Only digits, Latin letters and special characters allowed."
    )
    private String password;

}
