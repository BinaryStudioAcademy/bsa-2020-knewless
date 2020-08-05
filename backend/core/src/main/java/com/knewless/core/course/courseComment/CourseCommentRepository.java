package com.knewless.core.course.courseComment;

import com.knewless.core.course.courseComment.model.CourseComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CourseCommentRepository extends JpaRepository<CourseComment, UUID> {
}
