package com.knewless.core.lecture.lectureComment;

import com.knewless.core.comments.CommentRepository;
import com.knewless.core.lecture.lectureComment.model.LectureComment;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface LectureCommentRepository extends CommentRepository<LectureComment> {
	
	List<LectureComment> findAllByLectureId(UUID lectureId, Pageable pageable);
}
