package com.knewless.core.course.dto;

import lombok.Data;

import javax.validation.constraints.*;
import java.util.List;
import java.util.UUID;

@Data
public class CreateCourseRequestDto {

    private UUID id;

    private UUID userId;

    @NotBlank(message = "Course name can't be empty.")
    @Pattern(
            regexp = "^[\\d\\D]{2,40}$",
            message = "Course name length must be 2-40 symbols. " +
                    "Only digits, Latin letters and special characters allowed."
    )
    private String name;

    private String image;

    @NotBlank(message = "Course level can't be empty.")
    private String level;

    @Pattern(
            regexp = "^$|^[\\d\\D]{10,}$",
            message = "Course description minimum length must be 10 symbols. " +
                    "Only digits, Latin letters and special characters allowed."
    )
    private String description;

    private Boolean isReleased = false;

    private List<UUID> lectures;

}
