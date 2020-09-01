package com.knewless.core.history;

import com.knewless.core.history.dto.HistoryDto;
import com.knewless.core.dailyProgress.DailyProgressService;
import com.knewless.core.history.dto.WatchHistorySaveRequest;
import com.knewless.core.history.model.History;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.ZoneId;
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

    @Autowired
    public WatchHistoryService(HistoryRepository historyRepository,
                               LectureRepository lectureRepository,
                               UserRepository userRepository,
                               TagRepository tagRepository,
                               DailyProgressService dailyProgressService) {
        this.historyRepository = historyRepository;
        this.lectureRepository = lectureRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.dailyProgressService = dailyProgressService;
    }

	public long getTotalViewSeconds(UUID userId) {
		return historyRepository.getTotalViewSecondsByUserId(userId);
	}

    public long getProgress(UUID userId, UUID courseId) {
        return historyRepository.getProgressByUserAndCourse(userId, courseId);
    }
    public int getProgressByLecture(UUID userId, UUID lectureId) {
        var history = historyRepository.findByUser_IdAndLecture_Id(userId, lectureId);
        return history.map(value -> value.getSecondsWatched() * 100 / value.getLecture().getDuration()).orElse(0);
    
    }

	public long getViewedSeconds(UUID userId, UUID lectureId) {
		History viewHistory = historyRepository.findByUser_IdAndLecture_Id(userId, lectureId).orElseThrow();
		return viewHistory.getSecondsWatched();
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
        saveToProgress(userId, watchedNow - watchedBefore, savedHistory);
    }

    public List<HistoryDto> getUserHistory(UUID userId) {
        List<History> historyList = historyRepository.findAllByUserIdOrderByUpdatedAtDesc(userId);
        return historyList.stream()
                .map(HistoryMapper.MAPPER::historyToHistory)
                .peek(h -> {
                    List<String> tags = tagRepository.findAllByLectures_Id(h.getLecture().getId()).stream().map(Tag::getName).collect(Collectors.toList());
                    h.setTags(tags);
                })
                .collect(Collectors.toList());
    }
    
    private void saveToProgress(UUID userId, int watchedDifference, History savedHistory) {
        if (watchedDifference <= 0) {
            return;
        }
        var watchDate = savedHistory.getUpdatedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        dailyProgressService.saveProgress(userId, watchedDifference, watchDate);
    }
}
