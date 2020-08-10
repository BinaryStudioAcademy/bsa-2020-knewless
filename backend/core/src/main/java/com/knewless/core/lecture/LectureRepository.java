package com.knewless.core.lecture;

import com.knewless.core.lecture.Dto.ShortLectureDto;
import com.knewless.core.lecture.model.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LectureRepository extends JpaRepository<Lecture, UUID> {


@Query("SELECT new com.knewless.core.lecture.Dto.ShortLectureDto(l.id, l.name, l.description, l.duration) FROM Lecture l " +
        "INNER JOIN Course c ON l.course.id = c.id " +
        "INNER JOIN Author a ON a.id = c.author.id " +
        "WHERE a.user.id = :id")
List<ShortLectureDto> getShortLecturesByUserId(@Param("id")UUID id);

@Query("SELECT l FROM Lecture l " +
        "INNER JOIN Course c ON l.course.id = c.id " +
        "INNER JOIN Author a ON a.id = c.author.id " +
        "WHERE a.user.id = :id")
List<Lecture> getLecturesByUserId(@Param("id")UUID id);
}
