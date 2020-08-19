package com.knewless.core.path.dto;

import lombok.Data;

import javax.validation.constraints.*;
import java.util.List;
import java.util.UUID;

@Data
public class PathCreationRequestDto {

	@Size(min = 2, max = 40, message = "Path name length must be 2-40 symbols.")
	@Pattern(
			regexp = "^[a-zA-Z0-9!:;=<>@#$&()\\\\-`.+,\"/ ]{2,40}$",
			message = "Only digits, Latin letters and special characters allowed."
	)
	private String name;

	@Pattern(
			regexp = "^$|^[a-zA-Z0-9!:;=<>@#$&()\\\\-`.+,\"/ ]{10,}$",
			message = "Description can be empty or it min length must be 10 symbols. " +
					"Only digits, Latin letters and special characters allowed."
	)
	private String description;

	private List<UUID> tags;

	private List<UUID> courses;

	@NotNull
	private UUID imageTag;

}
