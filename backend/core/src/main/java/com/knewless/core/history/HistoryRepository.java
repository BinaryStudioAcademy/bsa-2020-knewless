package com.knewless.core.history;

import com.knewless.core.history.model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface HistoryRepository extends JpaRepository<History, UUID> {

    @Query("select coalesce(sum(secondsWatched), 0) from History where user.id=:userId")
    long getTotalViewSecondsByUserId(UUID userId);

    Optional<History> findByUser_IdAndLecture_Id(UUID userId, UUID lecture_id);

    @Query("select coalesce(avg(fractionWatched), 0) from History where user.id=:userId and lecture.course.id=:courseId")
    Float getAverageProgressByLectures(UUID userId, UUID courseId);

    List<History> findAllByUserIdOrderByUpdatedAtDesc(UUID userId);
    
    @Query("select count(h) from History h where h.user.id=:userId and h.lecture.course.id=:courseId")
    long countAllByUserAndCourse(UUID userId, UUID courseId);
}
