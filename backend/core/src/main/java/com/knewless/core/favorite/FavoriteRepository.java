package com.knewless.core.favorite;

import com.knewless.core.db.SourceType;
import com.knewless.core.favorite.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {

    Optional<Favorite> findFavoriteByUserIdAndSourceIdAndSourceType(UUID userId, UUID sourceId, SourceType type);

    @Transactional
    @Modifying
    @Query("DELETE FROM Favorite f WHERE f.id = :id")
    void deleteFavoriteById(@Param("id") UUID id);

    List<Favorite> findFavoriteByUserIdAndSourceType(UUID userId, SourceType type);
}
