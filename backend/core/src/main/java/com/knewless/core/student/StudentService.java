package com.knewless.core.student;

import com.knewless.core.currentUserCource.CurrentUserCourseService;
import com.knewless.core.dailyProgress.DailyProgressRepository;
import com.knewless.core.dailyProgress.model.DailyProgress;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.history.WatchHistoryService;
import com.knewless.core.progressGoal.ProgressGoalRepository;
import com.knewless.core.student.dto.ProgressResponseDto;
import com.knewless.core.student.dto.StudentMainInfoDto;
import com.knewless.core.student.dto.StudentProfileDto;
import com.knewless.core.student.dto.StudentSettingsDto;
import com.knewless.core.student.mapper.StudentMapper;
import com.knewless.core.student.model.Student;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.dto.TagDto;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentService {

	private final StudentRepository studentRepository;
	private final UserRepository userRepository;
	private final CurrentUserCourseService currentUserCourseService;
	private final TagRepository tagRepository;
	private final WatchHistoryService watchHistoryService;
	private final ProgressGoalRepository progressGoalRepository;
	private final DailyProgressRepository dailyProgressRepository;

	@Autowired
	public StudentService(StudentRepository studentRepository, UserRepository userRepository,
						  CurrentUserCourseService currentUserCourseService, TagRepository tagRepository,
						  WatchHistoryService watchHistoryService, ProgressGoalRepository progressGoalRepository,
						  DailyProgressRepository dailyProgressRepository) {
		this.studentRepository = studentRepository;
		this.userRepository = userRepository;
		this.currentUserCourseService = currentUserCourseService;
		this.tagRepository = tagRepository;
		this.watchHistoryService = watchHistoryService;
		this.progressGoalRepository = progressGoalRepository;
		this.dailyProgressRepository = dailyProgressRepository;
	}

	private static int secondsPassedSinceLastInterval(LocalDateTime goalSetAt, LocalDateTime now, int secondsInterval) {
		var secondsSinceGoalSet = ChronoUnit.SECONDS.between(goalSetAt, now);
		return (int) (secondsSinceGoalSet % secondsInterval);
	}

	public Optional<StudentSettingsDto> getStudentSettings(UUID userId) {
		var student = studentRepository.findByUserId(userId).orElseThrow(
				() -> new ResourceNotFoundException("Student", "userId", userId)
		);
		var result = StudentMapper.fromEntity(student);
		var studentTags = tagRepository.findAllByUsers_Id(userId).stream()
				.map(t -> new TagDto(t.getId(), t.getName(), t.getSource()))
				.collect(Collectors.toList());
		result.setTags(studentTags);
		return Optional.of(result);
	}

	public Optional<StudentSettingsDto> setStudentSettings(StudentSettingsDto settings) {
		var user = userRepository.findById(settings.getUserId()).orElseThrow(
				() -> new ResourceNotFoundException("User", "id", settings.getUserId())
		);
		user.setTags(settings.getTags().stream().map(t -> {
			var tempTag = new Tag();
			tempTag.setId(t.getId());
			return tempTag;
		}).collect(Collectors.toSet()));

		var oldSettings = studentRepository.findByUser(user);
		if (oldSettings.isEmpty()) {
			return Optional.of(studentRepository.save(StudentMapper.fromDto(settings, user)))
					.map(StudentMapper::fromEntity);
		}
		var updateSettings = StudentMapper.fromDto(settings, user);
		updateSettings.setCreatedAt(oldSettings.get().getCreatedAt());
		return Optional.of(studentRepository.save(updateSettings)).map(StudentMapper::fromEntity);

	}

	public StudentProfileDto getStudentProfile(UUID userId) {
		if (!this.userRepository.existsById(userId)) {
			throw new ResourceNotFoundException("User", "id", userId);
		}
		var profile = new StudentProfileDto();
		profile.setTotalContentWatched((int) this.watchHistoryService.getTotalViewSeconds(userId));
		profile.setCourses(this.currentUserCourseService.getLearningCourses(userId));
		return profile;
	}

	public Optional<StudentMainInfoDto> getStudentByUserId(UUID id) {
		var studentDto = studentRepository.findByUserId(id).orElseThrow(
				() -> new ResourceNotFoundException("Student", "id", id));
		return StudentMapper.studentToStudentMainInfoDto(studentDto);
	}

	public void setProgressGoal(UUID userId, UUID goalId) {
		var student = studentRepository.findByUserId(userId).orElseThrow();
		if (goalId == null) {
			student.setCurrentGoal(null);
		} else {
			student.setCurrentGoal(progressGoalRepository.getOne(goalId));
		}
		student.setDateGoalSet(LocalDate.now());
		studentRepository.save(student);
	}

	public Optional<ProgressResponseDto> getCurrentProgress(UUID userId) {
		var student = studentRepository.findByUserId(userId).orElseThrow();
		if (student.getCurrentGoal() == null || student.getDateGoalSet() == null) {
		    return Optional.empty();
        }
		LocalDateTime now = LocalDateTime.now();
		var goal = student.getCurrentGoal();
		int secondsSinceLastInterval = secondsPassedSinceLastInterval(student.getDateGoalSet().atStartOfDay(),
                now, goal.getIntervalSeconds());
        LocalDateTime goalStarted = now.minusSeconds(secondsSinceLastInterval);
        LocalDateTime goalExpires = goalStarted.plusDays(Duration.ofSeconds(goal.getIntervalSeconds()).toDays());
        List<DailyProgress> progressByDays = dailyProgressRepository.getAllByUserId_AndDateBetween(userId,
                goalStarted.toLocalDate(), now.toLocalDate());
        var secondsWatched = progressByDays.stream().mapToInt(DailyProgress::getSeconds).sum();
        int percentsDone = (int) ((secondsWatched / (float) goal.getDurationSeconds()) * 100);

        return Optional.of(ProgressResponseDto.builder()
                .goalName(goal.getName())
                .goalId(goal.getId())
                .secondsDone(secondsWatched)
                .secondsLeft(goal.getDurationSeconds() - secondsWatched)
                .secondsNeededOverall(goal.getDurationSeconds())
                .goalStarted(goalStarted)
                .goalExpires(goalExpires)
                .percentsDone(percentsDone)
                .build());
	}

	public Student findByUserId(UUID userId) {
		return studentRepository.findByUserId(userId).orElseThrow(() -> new ResourceNotFoundException("Student", "user id", userId));
	}
}
