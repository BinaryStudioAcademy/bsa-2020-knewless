package com.knewless.core.progressGoal.model;

import com.knewless.core.db.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "progress_goal")
public class ProgressGoal extends BaseEntity {

	@Column
	private String name;

	/**
	 * Defines the interval goal needs to be accomplished within
	 */
	@Column(name = "interval_seconds")
	private int intervalSeconds;

	/**
	 * Seconds that must be watched to accomplish the goal
	 */
	@Column(name = "duration_seconds")
	private int durationSeconds;
}
