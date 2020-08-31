package com.knewless.core.dailyProgress;

import com.knewless.core.dailyProgress.model.DailyProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DailyProgressRepository extends JpaRepository<DailyProgress, UUID> {
	Optional<DailyProgress> getByUserId_AndDate(UUID userId, LocalDate date);

	List<DailyProgress> getAllByUserId_AndDateBetween(UUID userId, LocalDate start, LocalDate end);
}
