package com.knewless.core.history;

import com.knewless.core.history.dto.WatchHistorySaveRequest;
import com.knewless.core.history.model.History;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class WatchHistoryService {
    private final HistoryRepository historyRepository;
    private final LectureRepository lectureRepository;
    private final UserRepository userRepository;

    @Autowired
    public WatchHistoryService(HistoryRepository historyRepository, LectureRepository lectureRepository, UserRepository userRepository) {
        this.historyRepository = historyRepository;
        this.lectureRepository = lectureRepository;
        this.userRepository = userRepository;
    }

    public long getTotalViewSeconds(UUID userId) {
        return historyRepository.getTotalViewSecondsByUserId(userId);
    }

    public long getProgress(UUID userId, UUID courseId) {
        return historyRepository.getProgressByUserAndCourse(courseId, userId);
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
        if (watchedBefore > watchedNow) {
            history.setSecondsWatched(watchedBefore);
        } else {
            history.setSecondsWatched(watchedNow);
        }
        historyRepository.save(history);
    }
}
