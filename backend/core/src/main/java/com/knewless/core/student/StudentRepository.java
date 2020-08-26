package com.knewless.core.student;

import com.knewless.core.author.model.Author;
import com.knewless.core.student.model.Student;
import com.knewless.core.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    Optional<Student> findByUser(User user);

    Optional<Student> findByUserId(UUID id);
    @Query("SELECT concat(s.firstName,' ', s.lastName) FROM Student s WHERE s.user.id = :userId ")
    String getStudentNameByUserId(UUID userId);
}
