package com.knewless.core.dailyProgress.model;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "daily_progress")
public class DailyProgress extends BaseEntity {

	@Column
	private int seconds;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column
	private LocalDate date;

	@Override
	public String toString() {
		return "DailyProgress{" +
				"seconds=" + seconds +
				", user=" + user.getEmail() +
				", date=" + date +
				'}';
	}
}

