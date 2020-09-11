package com.knewless.core.student;

import com.knewless.core.course.CourseRepository;
import com.knewless.core.currentUserCource.CurrentUserCourseService;
import com.knewless.core.dailyProgress.DailyProgressRepository;
import com.knewless.core.dailyProgress.dto.ActivityDto;
import com.knewless.core.dailyProgress.model.DailyProgress;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.history.HistoryRepository;
import com.knewless.core.student.dto.StudentMainInfoDto;
import com.knewless.core.student.dto.StudentProfileDto;
import com.knewless.core.student.dto.StudentSettingsDto;
import com.knewless.core.student.dto.StudentSubscriptionDto;
import com.knewless.core.student.mapper.StudentMapper;
import com.knewless.core.student.model.Student;
import com.knewless.core.subscription.SubscriptionRepository;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.dto.TagDto;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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
	private final HistoryRepository historyRepository;
	private final DailyProgressRepository dailyProgressRepository;
	private final SubscriptionRepository subscriptionRepository;
	private final CourseRepository courseRepository;
	
	@Autowired
	public StudentService(StudentRepository studentRepository, UserRepository userRepository,
						  CurrentUserCourseService currentUserCourseService, TagRepository tagRepository,
						  HistoryRepository historyRepository, DailyProgressRepository dailyProgressRepository,
						  SubscriptionRepository subscriptionRepository, CourseRepository courseRepository) {
		this.studentRepository = studentRepository;
		this.userRepository = userRepository;
		this.currentUserCourseService = currentUserCourseService;
		this.tagRepository = tagRepository;
		this.historyRepository = historyRepository;
		this.dailyProgressRepository = dailyProgressRepository;
		this.subscriptionRepository = subscriptionRepository;
		this.courseRepository = courseRepository;
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
		profile.setTotalContentWatched((int) historyRepository.getTotalViewSecondsByUserId(userId));
		profile.setCourses(this.currentUserCourseService.getLearningCourses(userId));
		var firstDay = (LocalDate.now()).minusWeeks(1);
		var activity = dailyProgressRepository.getAllByUserId_AndDateBetween(userId, (LocalDate.now()).minusWeeks(1), LocalDate.now());
		List<ActivityDto> activityList = new ArrayList<>();
		for (int i = 1; i < 8; i++) {
			ActivityDto item = new ActivityDto();
			LocalDate currentDay = (firstDay).plusDays(i);
			item.setDate(currentDay);
			int seconds = activity.stream()
					.filter(a -> a.getDate().equals(currentDay))
					.map(DailyProgress::getSeconds)
					.findFirst().orElse(0);
			item.setSeconds(seconds);
			activityList.add(item);
		}
		profile.setActivity(activityList);
		profile.setSubscriptions(subscriptionRepository.findAllByUserId(userId).stream()
				.map(result -> new StudentSubscriptionDto(result.getId(), result.getName(), courseRepository.countByAuthorId(result.getId()), result.getAvatar(), true))
				.collect(Collectors.toList()));
		return profile;
	}
	
	public Optional<StudentMainInfoDto> getStudentByUserId(UUID id) {
		var studentDto = studentRepository.findByUserId(id).orElseThrow(
				() -> new ResourceNotFoundException("Student", "id", id));
		return StudentMapper.studentToStudentMainInfoDto(studentDto);
	}
	
	public Student findByUserId(UUID userId) {
		return studentRepository.findByUserId(userId).orElseThrow(() -> new ResourceNotFoundException("Student", "user id", userId));
	}
}
