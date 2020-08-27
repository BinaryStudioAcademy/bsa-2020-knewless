package com.knewless.core.favorite;

import com.knewless.core.course.dto.FavouriteCourseResponseDto;
import com.knewless.core.db.SourceType;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {
    private final FavoriteService favoriteService;

    @Autowired
    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public boolean checkIsFavorite(@CurrentUser UserPrincipal userPrincipal, @RequestParam UUID id,
                                   @RequestParam SourceType type) {
        return favoriteService.checkIsFavorite(userPrincipal.getId(), id, type);
    }

    @PostMapping("/change")
    public boolean changeFavorite(@CurrentUser UserPrincipal userPrincipal, @RequestParam UUID id,
                                  @RequestParam SourceType type) {
        return favoriteService.changeFavorite(userPrincipal.getId(), id, type);
    }

    @GetMapping("/courses")
    public List<FavouriteCourseResponseDto> getFavouriteCourses(@CurrentUser UserPrincipal userPrincipal) {
        return favoriteService.getFavouriteCourses(userPrincipal.getId());
    }
}
