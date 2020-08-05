package com.knewless.core.lecture.lectureComment;

import com.knewless.core.lecture.lectureComment.model.LectureComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LectureCommentRepository extends JpaRepository<LectureComment, UUID> {
}
