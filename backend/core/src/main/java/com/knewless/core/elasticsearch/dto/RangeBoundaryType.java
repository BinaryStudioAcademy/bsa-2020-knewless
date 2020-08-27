package com.knewless.core.elasticsearch.dto;

import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.index.query.RangeQueryBuilder;

@Slf4j
public enum RangeBoundaryType {
	/**
	 * Greater than '>'
	 */
	GT,
	/**
	 * Greater than or equals '>='
	 */
	GTE,
	/**
	 * Less than '<'
	 */
	LT,
	/**
	 * Less than or equals '<='
	 */
	LTE;

	public RangeQueryBuilder appendToBuilder(RangeQueryBuilder rangeBuilder, String value) {
		switch (this) {
			case GT:
				return rangeBuilder.gt(value);
			case GTE:
				return rangeBuilder.gte(value);
			case LT:
				return rangeBuilder.lt(value);
			case LTE:
				return rangeBuilder.lte(value);
			default:
				log.warn("Unknown range boundary was passed: {}. It was ignored. ", this);
				return rangeBuilder;
		}
	}
}
