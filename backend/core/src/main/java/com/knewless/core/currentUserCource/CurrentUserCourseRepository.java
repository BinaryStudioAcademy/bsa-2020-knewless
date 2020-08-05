package com.knewless.core.currentUserCource;

import com.knewless.core.currentUserCource.model.CurrentUserCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CurrentUserCourseRepository extends JpaRepository<CurrentUserCourse, UUID> {
}
