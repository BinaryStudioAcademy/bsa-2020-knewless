package com.knewless.core.course.courseComment;

import com.knewless.core.course.courseComment.model.CourseComment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseCommentRepository extends JpaRepository<CourseComment, UUID> {
	List<CourseComment> findAllByCourseId(UUID course_id, Pageable pageable);
}
