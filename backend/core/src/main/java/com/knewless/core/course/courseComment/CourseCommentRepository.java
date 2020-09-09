package com.knewless.core.course.courseComment;

import com.knewless.core.comments.CommentRepository;
import com.knewless.core.course.courseComment.model.CourseComment;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseCommentRepository extends CommentRepository<CourseComment> {
	List<CourseComment> findAllByCourseId(UUID course_id, Pageable pageable);
}
