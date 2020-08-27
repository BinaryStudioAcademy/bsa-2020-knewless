package com.knewless.core.elasticsearch.dto;

import lombok.Data;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class EsSearchRequest {
	@NotNull
	private String query;
	@DecimalMin("0")
	private int size;
	@DecimalMin("0")
	private int page;
	@NotNull
	private List<MatchFilter> matchFilters;
	@NotNull
	private List<RangeFilter> rangeFilters;
	@NotNull
	private List<Sorting> sorting;
}
