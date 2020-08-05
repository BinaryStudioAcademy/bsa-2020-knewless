package com.knewless.core.lecture.lectureReaction;

import com.knewless.core.lecture.lectureReaction.model.LectureReaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LectureReactionRepository extends JpaRepository<LectureReaction, UUID> {
}
