package com.knewless.core.elasticsearch.dto;

import lombok.Data;

@Data
public class RangeBoundary {
	private RangeBoundaryType type;
	private String value;
}
