package com.knewless.core.history;

import com.knewless.core.dailyProgress.DailyProgressService;
import com.knewless.core.db.SourceType;
import com.knewless.core.history.dto.HistoryDto;
import com.knewless.core.history.dto.WatchHistorySaveRequest;
import com.knewless.core.history.model.History;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.dto.LectureHistoryDto;
import com.knewless.core.notification.NotificationService;
import com.knewless.core.notification.dto.NotificationDto;
import com.knewless.core.student.StudentGoalProgressService;
import com.knewless.core.student.dto.ProgressResponseDto;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.role.model.RoleType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class WatchHistoryService {
	private final HistoryRepository historyRepository;
	private final LectureRepository lectureRepository;
	private final UserRepository userRepository;
	private final TagRepository tagRepository;
	private final DailyProgressService dailyProgressService;
	private final StudentGoalProgressService studentGoalProgressService;
	private final NotificationService notificationService;
	@Value("${app.watch_history.progress_completed_threshold}")
	private double PROGRESS_COMPLETED_THRESHOLD;
	@Value("${fs.video_url}")
	private String URL;
	
	@Autowired
	public WatchHistoryService(HistoryRepository historyRepository, LectureRepository lectureRepository,
							   UserRepository userRepository, TagRepository tagRepository,
							   DailyProgressService dailyProgressService, StudentGoalProgressService studentGoalProgressService,
							   NotificationService notificationService) {
		this.historyRepository = historyRepository;
		this.lectureRepository = lectureRepository;
		this.userRepository = userRepository;
		this.tagRepository = tagRepository;
		this.dailyProgressService = dailyProgressService;
		this.studentGoalProgressService = studentGoalProgressService;
		this.notificationService = notificationService;
	}
	
	public long getTotalViewSeconds(UUID userId) {
		return historyRepository.getTotalViewSecondsByUserId(userId);
	}
	
	/**
	 * @return value between 0 and 100 - percent of completion
	 */
	public int getProgressByCourse(UUID userId, UUID courseId) {
		long lectureNum = lectureRepository.countAllByCourse_Id(courseId);
		long historiesNum = historyRepository.countAllByUserAndCourse(userId, courseId);
		float avgProgress = historyRepository.getAverageProgressByLectures(userId, courseId);
		float fracture = (historiesNum * avgProgress) / lectureNum;
		if (fracture >= PROGRESS_COMPLETED_THRESHOLD) {
			fracture = 1;
		}
		return (int) (fracture * 100);
	}
	
	/**
	 * @return value between 0 and 100 - percent of completion
	 */
	public int getProgressByLecture(UUID userId, UUID lectureId) {
		var history = historyRepository.findByUser_IdAndLecture_Id(userId, lectureId);
		return history.map(h -> {
			if (h.getFractionWatched() >= PROGRESS_COMPLETED_THRESHOLD) {
				return 100;
			} else {
				return (int) (h.getFractionWatched() * 100);
			}
		}).orElse(0);
	}
	
	public long getViewedSeconds(UUID userId, UUID lectureId) {
		History viewHistory = historyRepository.findByUser_IdAndLecture_Id(userId, lectureId).orElseThrow();
		return viewHistory.getSecondsWatched();
	}
	
	public List<HistoryDto> getUserHistory(UUID userId) {
		List<History> historyList = historyRepository.findAllByUserIdOrderByUpdatedAtDesc(userId);
		return historyList.stream()
				.map(HistoryMapper.MAPPER::historyToHistory)
				.peek(h -> {
					LectureHistoryDto historyDto = h.getLecture();
					List<String> tags = tagRepository.findAllByLectures_Id(historyDto.getId())
							.stream().map(Tag::getName).collect(Collectors.toList());
					h.setTags(tags);
					if (historyDto.getPreviewImage() != null && historyDto.getPreviewImage().startsWith("assets")) {
						historyDto.setPreviewImage(URL + historyDto.getPreviewImage());
					}
				})
				.collect(Collectors.toList());
	}
	
	public void saveWatchHistory(UUID userId, WatchHistorySaveRequest request) {
		History history = historyRepository.findByUser_IdAndLecture_Id(userId, request.getLectureId())
				.orElseGet(History::new);
		history.setLecture(lectureRepository.getOne(request.getLectureId()));
		history.setUser(userRepository.getOne(userId));
		history.setFractionWatched(request.getFractionWatched());
		var watchedBefore = history.getSecondsWatched();
		var watchedNow = request.getSecondsWatched();
		if (watchedBefore >= watchedNow) {
			log.info("History not saved as progress saved previously ({}s) is more or equals to the one that is pending to save ({}s)", watchedBefore, watchedNow);
			return;
		}
		history.setSecondsWatched(watchedNow);
		var savedHistory = historyRepository.save(history);
		log.info("Saved history {}", history);
		saveToProgressAndCheckIfGoalCompletedAndSendNotification(userId, watchedNow - watchedBefore, savedHistory);
	}
	
	private void saveToProgressAndCheckIfGoalCompletedAndSendNotification(UUID userId, int watchedDifference, History savedHistory) {
		if (watchedDifference <= 0) {
			return;
		}
		var watchDate = savedHistory.getUpdatedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
		dailyProgressService.saveProgress(userId, watchedDifference, watchDate);
		checkIfGoalCompletedAndSendNotification(userId);
	}
	
	private void checkIfGoalCompletedAndSendNotification(UUID userId) {
		if (userRepository.getRoleByUserId(userId).getName() != RoleType.USER) return;
		ProgressResponseDto currentProgress = studentGoalProgressService.getCurrentProgress(userId).orElse(null);
		if (currentProgress == null) return;
		
		if (currentProgress.isDone()) {
			if (!notificationAlreadySent(currentProgress, userId)) {
				log.info("{} user has completed his progress goal!", userId);
				notificationService.createAndSendNotification(notificationFromProgress(currentProgress), userId);
			}
		}
	}
	
	private static NotificationDto notificationFromProgress(ProgressResponseDto currentProgress) {
		return NotificationDto.builder()
				.text("You have completed your daily goal!")
				.sourceType(SourceType.PERSONAL_GOAL_COMPLETION.toString())
				.sourceId(currentProgress.getGoalId().toString())
				.date(new Date())
				.isRead(false)
				.build();
	}
	
	private boolean notificationAlreadySent(ProgressResponseDto currentProgress, UUID userId) {
		return notificationService.wasNotificationAboutProgressSent(
				currentProgress.getGoalStarted(),
				currentProgress.getGoalExpires(),
				currentProgress.getGoalId(),
				userId);
	}
}
