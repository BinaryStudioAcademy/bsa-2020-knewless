package com.knewless.core.path.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Data
public class PathCreationRequestDto {
	@NotBlank
	private String name;
	private String description;
	private List<UUID> tags;
	private List<UUID> courses;
	@NotNull
	private UUID imageTag;
}
