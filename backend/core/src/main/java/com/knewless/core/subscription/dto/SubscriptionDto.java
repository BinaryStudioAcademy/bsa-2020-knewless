package com.knewless.core.subscription.dto;

import com.knewless.core.db.SourceType;
import lombok.Data;

import java.util.UUID;

@Data
public class SubscriptionDto {
    private UUID userId;
    private UUID sourceId;
    private SourceType sourceType;
}
