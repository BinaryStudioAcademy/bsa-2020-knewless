package com.knewless.core.author;

import com.knewless.core.author.model.Author;
import com.knewless.core.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface AuthorRepository extends JpaRepository<Author, UUID> {

    @Query("SELECT a FROM Author a WHERE  a.user.id = :userId")
    Optional<Author> findByUserId(UUID userId);

    Optional<Author> findByUser(User user);
}
