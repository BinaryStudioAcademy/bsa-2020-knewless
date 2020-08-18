package com.knewless.core.history.dto;

import lombok.Data;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;
import java.util.UUID;

@Data
public class WatchHistorySaveRequest {
	@NotBlank
	private UUID lectureId;
	@PositiveOrZero
	private int secondsWatched;
	@DecimalMin(value = "0")
	@DecimalMax(value = "1")
	private float fractionWatched;
}
