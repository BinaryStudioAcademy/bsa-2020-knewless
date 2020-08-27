package com.knewless.core.elasticsearch.dto;

import com.knewless.core.elasticsearch.model.EsEntity;
import lombok.Data;

import java.util.List;

@Data
public class EsSearchResult {
	private long total;
	private List<EsEntity> results;
}
