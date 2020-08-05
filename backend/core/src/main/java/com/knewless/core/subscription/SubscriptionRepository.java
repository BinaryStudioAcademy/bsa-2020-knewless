package com.knewless.core.subscription;

import com.knewless.core.subscription.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {
}
