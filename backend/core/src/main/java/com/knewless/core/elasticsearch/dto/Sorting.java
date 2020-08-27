package com.knewless.core.elasticsearch.dto;

import lombok.Data;
import org.elasticsearch.search.sort.SortOrder;

@Data
public class Sorting {
	private String field;
	private SortOrder order;
}
