package com.knewless.core.dailyProgress;

import com.knewless.core.dailyProgress.model.DailyProgress;
import com.knewless.core.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@Slf4j
public class DailyProgressService {
	private final DailyProgressRepository progressRepository;
	private final UserRepository userRepository;


	@Autowired
	public DailyProgressService(DailyProgressRepository progressRepository, UserRepository userRepository) {
		this.progressRepository = progressRepository;
		this.userRepository = userRepository;
	}

	public void saveProgress(UUID userId, int watchedDifference, LocalDate watchDate) {
		var progress = progressRepository.getByUserId_AndDate(userId, watchDate).orElseGet(DailyProgress::new);
		progress.setUser(userRepository.getOne(userId));
		progress.setDate(watchDate);
		progress.setSeconds(progress.getSeconds() + watchedDifference);
		progressRepository.save(progress);
		log.info("Saved progress (+{}s) {}", watchedDifference,  progress);
	}
}
