package com.knewless.core.course.dto;

import lombok.Data;

import javax.validation.constraints.*;
import java.util.List;
import java.util.UUID;

@Data
public class CreateCourseRequestDto {

    private UUID userId;

    @Size(min = 2, max = 40, message = "Course name length must be 2-40 symbols.")
    @Pattern(
            regexp = "^[a-zA-Z0-9!:;=<>@#$&()\\\\-`.+,\"/ ]{2,40}$",
            message = "Only digits, Latin letters and special characters allowed."
    )
    private String name;

    private String image;

    @NotBlank
    private String level;

    @Pattern(
            regexp = "^$|^[a-zA-Z0-9!:;=<>@#$&()\\\\-`.+,\"/ ]{10,}$",
            message = "Course description can be empty or its minimum length must be 10 symbols. " +
                    "Only digits, Latin letters and special characters allowed."
    )
    private String description;

    @NotNull
    private Boolean isReleased;

    private List<UUID> lectures;

}
