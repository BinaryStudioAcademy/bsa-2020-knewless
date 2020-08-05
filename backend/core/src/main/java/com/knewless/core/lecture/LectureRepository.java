package com.knewless.core.lecture;

import com.knewless.core.lecture.model.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LectureRepository extends JpaRepository<Lecture, UUID> {
}
