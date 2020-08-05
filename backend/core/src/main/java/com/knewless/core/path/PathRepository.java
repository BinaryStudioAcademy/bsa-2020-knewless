package com.knewless.core.path;

import com.knewless.core.path.model.Path;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PathRepository extends JpaRepository<Path, UUID> {
}
