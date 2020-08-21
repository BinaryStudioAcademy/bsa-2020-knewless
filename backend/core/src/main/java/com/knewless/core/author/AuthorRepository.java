package com.knewless.core.author;

import com.knewless.core.author.model.Author;
import com.knewless.core.school.model.School;
import com.knewless.core.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AuthorRepository extends JpaRepository<Author, UUID> {

    @Query("select a from Author a where a.user.id = :userId")
    Optional<Author> findByUserId(@Param("userId") UUID userId);

    Optional<Author> findByUser(User user);

    Integer countBySchoolId(UUID schoolId);

    Optional<Author> findOneById(UUID authorId);

    @Query("select a.school from Author a where a.id = :authorId")
    Optional<School> getSchoolByAuthorId(@Param("authorId") UUID authorId);

    @Query(value = "select count(*) from subscriptions where source_type = 'AUTHOR' and source_id = :authorId",
            nativeQuery = true)
    Optional<Integer> getNumberOfSubscriptions(@Param("authorId") UUID authorId);

    @Query("select a.id from Author a where a.user.email = :currentUserEmail")
    Optional<UUID> checkForCurrentUser(@Param("currentUserEmail") String currentUserEmail);

    List<Author> findBySchoolId(UUID id);
}

