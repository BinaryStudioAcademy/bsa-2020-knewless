package com.knewless.core.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TagDto {
	private UUID id;
	private String name;
	private String imageSrc;
}
