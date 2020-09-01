package com.knewless.core.tag;

import com.knewless.core.tag.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Query("SELECT DISTINCT t.name FROM Course c LEFT JOIN c.lectures as l LEFT JOIN l.tags as t WHERE c.id = :id")
    List<String> getTagsByCourse(UUID id);

    List<Tag> findAllByLectures_Id(UUID lectureId);
    
    List<Tag> findAllByUsers_Id(UUID user_id);
    
    List<Tag> findAllByIdNotIn(List<UUID> tagIds);
}
