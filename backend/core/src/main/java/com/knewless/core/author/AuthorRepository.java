package com.knewless.core.author;

import com.knewless.core.author.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthorRepository extends JpaRepository<Author, UUID> {

    Optional<Author> getAuthorByUser_Id(UUID id);
}
