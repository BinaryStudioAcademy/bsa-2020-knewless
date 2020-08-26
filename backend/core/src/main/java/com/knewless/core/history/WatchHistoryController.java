package com.knewless.core.history;

import com.knewless.core.history.dto.WatchHistorySaveRequest;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("watch_history")
public class WatchHistoryController {
    private final WatchHistoryService service;

    @Autowired
    public WatchHistoryController(WatchHistoryService service) {
        this.service = service;
    }

    @GetMapping
    public long totalViewSeconds(@CurrentUser UserPrincipal userPrincipal) {
        return service.getTotalViewSeconds(userPrincipal.getId());
    }

    @GetMapping("{lectureId}")
    public long viewedSeconds(@CurrentUser UserPrincipal userPrincipal, @PathVariable UUID lectureId) {
        return service.getViewedSeconds(userPrincipal.getId(), lectureId);
    }

    @PostMapping
    public void saveWatchHistory(@CurrentUser UserPrincipal userPrincipal,
                                 @Valid @RequestBody WatchHistorySaveRequest request) {
        service.saveWatchHistory(userPrincipal.getId(), request);
    }
}
