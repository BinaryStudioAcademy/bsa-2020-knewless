package com.knewless.core.path.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class PathCreationRequestDto {
	private String name;
	private String description;
	private List<UUID> tags;
	private List<UUID> courses;
	private UUID imageTag;
}
