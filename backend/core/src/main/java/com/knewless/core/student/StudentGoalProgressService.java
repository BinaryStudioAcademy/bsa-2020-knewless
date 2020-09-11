package com.knewless.core.student;

import com.knewless.core.dailyProgress.DailyProgressRepository;
import com.knewless.core.dailyProgress.model.DailyProgress;
import com.knewless.core.progressGoal.ProgressGoalRepository;
import com.knewless.core.student.dto.ProgressResponseDto;
import com.knewless.core.student.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentGoalProgressService {
	private final StudentRepository studentRepository;
	private final ProgressGoalRepository progressGoalRepository;
	private final DailyProgressRepository dailyProgressRepository;
	
	@Autowired
	public StudentGoalProgressService(StudentRepository studentRepository, ProgressGoalRepository progressGoalRepository, DailyProgressRepository dailyProgressRepository) {
		this.studentRepository = studentRepository;
		this.progressGoalRepository = progressGoalRepository;
		this.dailyProgressRepository = dailyProgressRepository;
	}
	
	private static int secondsPassedSinceLastInterval(LocalDateTime goalSetAt, LocalDateTime now, int secondsInterval) {
		var secondsSinceGoalSet = ChronoUnit.SECONDS.between(goalSetAt, now);
		return (int) (secondsSinceGoalSet % secondsInterval);
	}
	
	public void setProgressGoal(UUID userId, UUID goalId) {
		var student = studentRepository.findByUserId(userId).orElseThrow();
		if (goalId == null) {
			student.setCurrentGoal(null);
		} else {
			student.setCurrentGoal(progressGoalRepository.getOne(goalId));
		}
		student.setDateGoalSet(LocalDate.now());
		// resetting congratulation flag
		student.setCongratulationShown(null);
		studentRepository.save(student);
	}
	
	public Optional<ProgressResponseDto> getCurrentProgress(UUID userId) {
		var student = studentRepository.findByUserId(userId).orElseThrow();
		if (student.getCurrentGoal() == null || student.getDateGoalSet() == null) {
			return Optional.empty();
		}
		LocalDateTime nowDateTime = LocalDateTime.now();
		var goal = student.getCurrentGoal();
		int secondsSinceLastIntervalStarted = secondsPassedSinceLastInterval(student.getDateGoalSet().atStartOfDay(),
				nowDateTime, goal.getIntervalSeconds());
		LocalDateTime goalStarted = nowDateTime.minusSeconds(secondsSinceLastIntervalStarted);
		LocalDateTime goalExpires = goalStarted.plusDays(Duration.ofSeconds(goal.getIntervalSeconds()).toDays());
		List<DailyProgress> progressByDays = dailyProgressRepository.getAllByUserId_AndDateBetween(userId,
				goalStarted.toLocalDate(), nowDateTime.toLocalDate());
		var secondsWatched = progressByDays.stream().mapToInt(DailyProgress::getSeconds).sum();
		int percentsDone = (int) ((secondsWatched / (float) goal.getDurationSeconds()) * 100);
		LocalDate dateCongratsShown = student.getCongratulationShown();
		boolean congratsShown = false;
		if (dateCongratsShown != null) {
			congratsShown = (dateCongratsShown.isAfter(goalStarted.toLocalDate()) || dateCongratsShown.isEqual(goalStarted.toLocalDate())) &&
					(dateCongratsShown.isBefore(goalExpires.toLocalDate()) || dateCongratsShown.isEqual(goalExpires.toLocalDate()));
		}
		
		return Optional.of(ProgressResponseDto.builder()
				.goalName(goal.getName())
				.goalId(goal.getId())
				.secondsDone(secondsWatched)
				.secondsLeft(goal.getDurationSeconds() - secondsWatched)
				.secondsNeededOverall(goal.getDurationSeconds())
				.goalStarted(goalStarted)
				.goalExpires(goalExpires)
				.percentsDone(percentsDone)
				.isDone(percentsDone >= 100)
				.congratulationShown(congratsShown)
				.build());
	}
	
	public void setCongratulationsShown(UUID userId) {
		Student foundStudent = studentRepository.findByUserId(userId).orElseThrow();
		foundStudent.setCongratulationShown(LocalDate.now());
		studentRepository.save(foundStudent);
	}
}
