package com.knewless.core.course.courseReaction;

import com.knewless.core.course.courseReaction.model.CourseReaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CourseReactionRepository extends JpaRepository<CourseReaction, UUID> {
}
