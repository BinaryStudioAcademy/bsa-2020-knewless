package com.knewless.core.lecture.homework;

import com.knewless.core.lecture.homework.model.Homework;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HomeworkRepository extends JpaRepository<Homework, UUID> {
}
