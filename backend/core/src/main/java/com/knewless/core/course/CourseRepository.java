package com.knewless.core.course;

import com.knewless.core.course.dto.CourseQueryResult;
import com.knewless.core.course.model.Course;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    @Query("SELECT new com.knewless.core.course.dto.CourseQueryResult(c.id, " +
            "c.name, c.level, c.author.name, c.category.name, c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "(SELECT COALESCE(SUM(CASE WHEN cr.reaction = TRUE THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr WHERE cr.reaction = TRUE), " +
            "SIZE(c.reactions)) " +
            "FROM Course c WHERE c.id = :id")
    CourseQueryResult getCourseById(@Param("id") UUID id);

    @Query("SELECT c.id from Course c")
    List<UUID> findRecommendedCoursesId(Pageable pageable);
}
