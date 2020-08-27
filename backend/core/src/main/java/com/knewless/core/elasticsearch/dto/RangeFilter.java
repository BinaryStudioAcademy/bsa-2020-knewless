package com.knewless.core.elasticsearch.dto;

import lombok.Data;

import java.util.List;

@Data
public class RangeFilter {
	private String field;
	private List<RangeBoundary> rangeBoundaries;
}
