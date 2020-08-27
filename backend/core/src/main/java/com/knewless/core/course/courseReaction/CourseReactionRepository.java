package com.knewless.core.course.courseReaction;

import com.knewless.core.course.courseReaction.model.CourseReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseReactionRepository extends JpaRepository<CourseReaction, UUID> {

    Boolean existsByCourseIdAndUserId(UUID courseId, UUID userId);

    Optional<CourseReaction> findByCourseIdAndUserId(UUID courseId, UUID userId);

    int countByCourseId(UUID courseId);

    List<CourseReaction> findByCourseId(UUID courseId);
}
