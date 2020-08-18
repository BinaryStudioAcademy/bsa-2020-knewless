package com.knewless.core.subscription;

import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.db.SourceType;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.subscription.dto.SubscriptionDto;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/subscription")
public class SubscriptionController {
    @Autowired
    SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public void subscribe(@CurrentUser UserPrincipal userPrincipal,
                          @RequestBody SubscriptionDto subscription) {
        System.out.println(subscription);
        subscription.setUserId(userPrincipal.getId());
        subscriptionService.subscribe(subscription);
    }

    @PostMapping("/unsubscribe")
    public void unsubscribe(@CurrentUser UserPrincipal userPrincipal,
                            @RequestBody SubscriptionDto subscription) {
        System.out.println(subscription);
        subscription.setUserId(userPrincipal.getId());
        subscriptionService.unsubscribe(subscription);
    }

}
