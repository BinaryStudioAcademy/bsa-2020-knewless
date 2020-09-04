package com.knewless.core.user.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class BriefUserDto {
	private UUID id;
	private String username;
	private String email;
	private String role;
}
