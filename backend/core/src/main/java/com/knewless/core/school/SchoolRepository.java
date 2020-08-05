package com.knewless.core.school;

import com.knewless.core.school.model.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SchoolRepository extends JpaRepository<School, UUID> {
}
