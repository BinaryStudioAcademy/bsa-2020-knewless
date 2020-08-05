package com.knewless.core.tag;

import com.knewless.core.tag.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
}
