package com.knewless.core.subscription;

import com.knewless.core.db.SourceType;
import com.knewless.core.subscription.dto.SubscriptionDto;
import com.knewless.core.subscription.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
    @Query("SELECT s FROM Subscription s " +
            "WHERE s.user.id = :userId " +
            "AND s.sourceId = :sourceId " +
            "AND s.sourceType = :sourceType")
    List<Subscription> findBySource(@Param("userId") UUID userId, @Param("sourceId") UUID sourceId, @Param("sourceType") SourceType sourceType);

    @Modifying
    @Transactional
    @Query("DELETE FROM Subscription s " +
            "WHERE s.user.id = :userId " +
            "AND s.sourceId = :sourceId " +
            "AND s.sourceType = :sourceType")
    void deleteBySource(UUID userId, UUID sourceId, SourceType sourceType);

    @Query("SELECT s.user.id FROM Subscription s " +
            "WHERE s.sourceId = :sourceId " +
            "AND s.sourceType = :sourceType")
    List<UUID> findAllBySource(UUID sourceId, SourceType sourceType);

}
