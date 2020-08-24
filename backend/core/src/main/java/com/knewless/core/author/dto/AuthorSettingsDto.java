package com.knewless.core.author.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.UUID;

@Data
public class AuthorSettingsDto {

    @NotNull(message = "Id cannot be null.")
    private UUID id;

    private UUID userId;

    private String avatar;

    @NotNull(message = "First name can't be null.")
    @Pattern(regexp = "^[a-zA-z]{2,40}$", message = "First Name must be 2-40 symbols (only Latin letters allowed).")
    private String firstName;

    @NotNull(message = "Last name can't be null.")
    @Pattern(regexp = "^[a-zA-z]{2,40}$", message = "Last Name must be 2-40 symbols (only Latin letters allowed).")
    private String lastName;

    @Pattern(regexp = "^$|^[a-zA-Z][a-zA-Z- ]+$", message = "Job minimum length must be 2 symbol. " +
            "Only Latin letters, hyphen and whitespaces allowed.")
    private String job;

    @NotBlank(message = "Location can't be empty.")
    private String location;

    @Pattern(
            regexp = "^$|^[a-zA-Z0-9-]{2,40}$",
            message = "Company name must be 2-40 symbols (only Latin letters, numbers, and '-' allowed)."
    )
    private String company;

    @Pattern(
            regexp = "^$|^(https?)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]",
            message = "Website url is invalid."
    )
    private String website;

    @Pattern(regexp = "^$|^https(?:s)?://twitter\\.com/([a-zA-Z0-9_]+)$", message = "Twitter url is invalid.")
    private String twitter;

    @Pattern(
            regexp = "^$|^[\\d\\D]{0,600}$",
            message = "Biography maximum length can be 600 symbols. " +
                    "Only Latin letters, numbers and special characters allowed."
    )
    private String biography;

}
