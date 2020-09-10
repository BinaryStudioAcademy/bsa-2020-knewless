package com.knewless.core.comments;

import java.util.Optional;
import java.util.UUID;

public interface CommentSourceRepository<T extends CommentableEntity> {
	Optional<T> findSourceById(UUID sourceId);
}
