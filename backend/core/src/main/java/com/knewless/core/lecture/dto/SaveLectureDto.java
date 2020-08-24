package com.knewless.core.lecture.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveLectureDto {

    private UUID id;

    @NotBlank(message = "Lecture name can't be empty.")
    @Pattern(
            regexp = "^[\\d\\D]{3,40}$",
            message = "Lecture name must be 3-40 symbols. Only digits, Latin letters and special characters allowed."
    )
    private String name;

    @Pattern(
            regexp = "^$|^[\\d\\D]{10,}$",
            message = "Lecture description can be empty or its minimum length must be 10 symbols. " +
                    "Only digits, Latin letters and special characters allowed."
    )
    private String description;

    @NotNull
    @DecimalMin(value = "1.0", message = "Duration can't be less than 1.")
    private double duration;

}
