package com.knewless.core.lecture.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveLectureDto {

    private UUID id;

    @Pattern(
            regexp = "^[a-zA-Z0-9!:;=<>@#$&()\\\\-`.+,\"/ ]{2,40}$",
            message = "Only digits, Latin letters and special characters allowed."
    )
    private String name;

    @Pattern(
            regexp = "^$|^[a-zA-Z0-9!:;=<>@#$&()\\\\-`.+,\"/ ]{10,}$",
            message = "Lecture description can be empty or it min length must be 10 symbols. " +
                    "Only digits, Latin letters and special characters allowed."
    )
    private String description;

    @NotNull
    @DecimalMin(value = "1.0", message = "Duration can't be less than 1.")
    private double duration;

}
