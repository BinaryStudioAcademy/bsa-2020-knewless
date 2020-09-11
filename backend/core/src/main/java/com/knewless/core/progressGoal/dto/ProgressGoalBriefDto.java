package com.knewless.core.progressGoal.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ProgressGoalBriefDto {
	private UUID id;
	private String name;
	private int durationSeconds;
}
