package com.knewless.core.subscription.mapper;

import com.knewless.core.subscription.dto.SubscriptionDto;
import com.knewless.core.subscription.model.Subscription;
import com.knewless.core.user.model.User;

public class SubscriptionMapper {
    public static Subscription fromDto(SubscriptionDto subscription, User user) {
        Subscription result = new Subscription();
        result.setUser(user);
        result.setSourceId(subscription.getSourceId());
        result.setSourceType(subscription.getSourceType());
        return result;
    }
}
