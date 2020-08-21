package com.knewless.core.subscription;

import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.subscription.dto.SubscriptionDto;
import com.knewless.core.user.model.CurrentUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subscription")
@Slf4j
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/subscribe")
    public void subscribe(@CurrentUser UserPrincipal userPrincipal,
                          @RequestBody SubscriptionDto subscription) {
        log.info("User with id: '{}', sent subscribe request: '{}'", userPrincipal.getId(), subscription);
        subscription.setUserId(userPrincipal.getId());
        subscriptionService.subscribe(subscription);
    }

    @PostMapping("/unsubscribe")
    public void unsubscribe(@CurrentUser UserPrincipal userPrincipal,
                            @RequestBody SubscriptionDto subscription) {
        log.info("User with id: '{}', sent unsubscribe request: '{}'", userPrincipal.getId(), subscription);
        subscription.setUserId(userPrincipal.getId());
        subscriptionService.unsubscribe(subscription);
    }

}
