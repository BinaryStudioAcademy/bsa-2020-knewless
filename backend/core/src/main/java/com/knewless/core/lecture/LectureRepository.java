package com.knewless.core.lecture;

import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.lecture.model.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LectureRepository extends JpaRepository<Lecture, UUID> {


@Query("SELECT new com.knewless.core.lecture.dto.ShortLectureDto(l.id, l.name, " +
        "l.description, l.webLink, l.urlOrigin, l.url1080, l.url720, l.url480, l.duration, false) FROM Lecture l " +
        "WHERE l.user.id = :id")
List<ShortLectureDto> getShortLecturesByUserId(@Param("id")UUID id);

    @Query("SELECT l FROM Lecture l " +
            "WHERE l.user.id = :id")
    List<Lecture> getLecturesByUserId(@Param("id")UUID id);

    @Transactional
    @Modifying
    @Query("UPDATE Lecture l " +
            "SET l.duration = :duration, l.urlOrigin = :path " +
            "WHERE l.id = :id")
    void setDurationPath(@Param("id")UUID id, @Param("duration")int duration, @Param("path")String path);

    @Query("SELECT l " +
            "FROM Lecture l JOIN l.course c JOIN c.paths p " +
            "WHERE p.id=:id")
    List<Lecture> getLecturesByPathId(@Param("id") UUID id);
}
