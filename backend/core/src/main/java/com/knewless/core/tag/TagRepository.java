package com.knewless.core.tag;

import com.knewless.core.tag.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {

    @Query("SELECT t FROM Tag t INNER JOIN t.lectures tl ON tl.id = :lectureId")
    List<Tag> findByLectureId(@Param("lectureId") UUID lectureId);
}
