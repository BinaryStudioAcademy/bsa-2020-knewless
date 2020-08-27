package com.knewless.core.elasticsearch.dto;

import lombok.Data;

@Data
public class MatchFilter {
	private String field;
	private String value;
}
