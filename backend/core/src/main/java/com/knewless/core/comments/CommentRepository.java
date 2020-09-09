package com.knewless.core.comments;

import com.knewless.core.db.BaseComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentRepository<T extends BaseComment> extends JpaRepository<T, UUID> {
}
