package com.knewless.core.progressGoal;

import com.knewless.core.progressGoal.model.ProgressGoal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProgressGoalRepository extends JpaRepository<ProgressGoal, UUID> {
}
