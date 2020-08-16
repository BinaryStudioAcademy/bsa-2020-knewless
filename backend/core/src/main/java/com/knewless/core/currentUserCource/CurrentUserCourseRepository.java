package com.knewless.core.currentUserCource;

import com.knewless.core.currentUserCource.model.CurrentUserCourse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CurrentUserCourseRepository extends JpaRepository<CurrentUserCourse, UUID> {

    @Query("SELECT DISTINCT cc.course.id FROM CurrentUserCourse cc WHERE cc.user.id = :id")
    List<UUID> getContinueLearningCoursesId(@Param("id") UUID userId, Pageable pageable);

    @Query("SELECT DISTINCT cc.course.id FROM CurrentUserCourse cc WHERE cc.user.id = :id")
    List<UUID> getLearningCoursesId(@Param("id") UUID userId);

}
