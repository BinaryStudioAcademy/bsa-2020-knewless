package com.knewless.core.history;

import com.knewless.core.history.dto.HistoryDto;
import com.knewless.core.history.dto.WatchHistorySaveRequest;
import com.knewless.core.history.model.History;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class WatchHistoryService {
    private final HistoryRepository historyRepository;
    private final LectureRepository lectureRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    @Autowired
    public WatchHistoryService(HistoryRepository historyRepository,
                               LectureRepository lectureRepository,
                               UserRepository userRepository,
                               TagRepository tagRepository) {
        this.historyRepository = historyRepository;
        this.lectureRepository = lectureRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }

    public long getTotalViewSeconds(UUID userId) {
        return historyRepository.getTotalViewSecondsByUserId(userId);
    }

    public long getProgress(UUID userId, UUID courseId) {
        return historyRepository.getProgressByUserAndCourse(courseId, userId);
    }
    public int getProgressByLecture(UUID userId, UUID lectureId) {
        var history = historyRepository.findByUser_IdAndLecture_Id(userId, lectureId);
        if(history.isPresent()){
            return history.get().getSecondsWatched()*100/history.get().getLecture().getDuration();
        }
        return 0;

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

    public List<HistoryDto> getUserHistory(UUID userId) {
        List<History> historyList = historyRepository.findAllByUserIdOrderByUpdatedAtDesc(userId);
        return historyList.stream()
                .map(HistoryMapper.MAPPER::historyToHistory)
                .peek(h -> {
                    List<String> tags = tagRepository.findByLectureId(h.getLecture().getId()).stream().map(Tag::getName).collect(Collectors.toList());
                    h.setTags(tags);
                })
                .collect(Collectors.toList());
    }
}
