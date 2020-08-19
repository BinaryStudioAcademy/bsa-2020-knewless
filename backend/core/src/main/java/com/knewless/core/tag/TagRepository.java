package com.knewless.core.tag;

import com.knewless.core.tag.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {

    @Query(value = "select cast(tag_id as varchar) from user_tag where user_id = :userId", nativeQuery = true)
    List<UUID> getTagsByUserId(@Param("userId") UUID userId);

    @Query(value = "select cast(tag_id as varchar) from user_tag where user_id = :userId", nativeQuery = true)
    List<UUID> findAllByUserId(@Param("userId") UUID userId);

    @Query(value = "delete from user_tag where user_id = :userId", nativeQuery = true)
    void deleteAllByUserId(@Param("userId") UUID userId);

    @Query("SELECT t FROM Tag t INNER JOIN t.lectures tl ON tl.id = :lectureId")
    List<Tag> findByLectureId(@Param("lectureId") UUID lectureId);

}
