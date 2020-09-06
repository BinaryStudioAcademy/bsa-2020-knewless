package com.knewless.core.path.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;
import java.util.UUID;

@Data
public class PathUpdateRequestDto {
    @NotNull
    private UUID id;

    @NotBlank(message = "Path name can't be empty.")
    @Pattern(
            regexp = "^[\\d\\D]{2,40}$",
            message = "Path name length must be 2-40 symbols. " +
                    "Only digits, Latin letters and special characters allowed."
    )
    private String name;

    @Pattern(
            regexp = "^$|^[\\d\\D]{10,}$",
            message = "Path description minimum length must be 10 symbols. " +
                    "Only digits, Latin letters and special characters allowed."
    )
    private String description;

    private List<UUID> tags;

    private List<UUID> courses;

    @NotNull
    private UUID imageTag;

    private Boolean isReleased = false;
}
