package com.knewless.core.student.dto;

import lombok.Data;

import javax.validation.constraints.*;
import java.util.List;
import java.util.UUID;

@Data
public class StudentSettingsDto {

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

    @NotBlank(message = "Job can't be empty.")
    private String job;

    @NotBlank(message = "Location can't be empty.")
    private String location;

    @NotNull(message = "Company can't be null.")
    @Pattern(
            regexp = "^[a-zA-Z0-9-]{2,40}$",
            message = "Company name must be 2-40 symbols (only Latin letters, numbers, and '-' allowed)."
    )
    private String company;

    @NotNull(message = "Website url can't be null.")
    @Pattern(
            regexp = "^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]",
            message = "Website url is invalid"
    )
    private String website;

    @Pattern(
            regexp = "^$|^[\\d\\D]{50,}$",
            message = "Biography minimum length must be 50 symbols (only Latin letters, numbers and special characters allowed)."
    )
    private String biography;

    @NotBlank(message = "Direction can't be empty.")
    private String direction;

    @DecimalMin(value = "0", message = "Experience must be a single number from 0 to 80.")
    @DecimalMax(value = "80", message = "Experience must be a single number from 0 to 80.")
    private int experience;

    @NotBlank(message = "Level can't be empty.")
    private String level;

    @NotBlank(message = "Industry can't be empty.")
    private String industry;

    @NotBlank(message = "Role can't be empty.")
    private String role;

    @NotBlank(message = "Employment can't be empty.")
    private String employment;

    @NotBlank(message = "Education can't be empty.")
    private String education;

    @DecimalMin(value = "1950", message = "Year min value is 1950.")
    @DecimalMax(value = "2020", message = "Year max value is 2020.")
    private int year;

    private List<UUID> tags;

}
