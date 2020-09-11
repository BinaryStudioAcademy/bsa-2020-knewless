package com.knewless.core.student.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ProgressResponseDto {
	private UUID goalId;
	private String goalName;
	private int percentsDone;
	private int secondsDone;
	private int secondsLeft;
	private int secondsNeededOverall;
	private LocalDateTime goalStarted;
	private LocalDateTime goalExpires;
	private boolean isDone;
	private boolean congratulationShown;
}
