package com.knewless.core.favorite;

import com.knewless.core.article.dto.FavouriteArticleDto;
import com.knewless.core.author.dto.FavouriteAuthorResponseDto;
import com.knewless.core.course.dto.FavouriteCourseResponseDto;
import com.knewless.core.db.SourceType;
import com.knewless.core.lecture.Dto.FavouriteLectureResponseDto;
import com.knewless.core.path.dto.FavouritePathResponseDto;
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

    @GetMapping("/authors")
    public List<FavouriteAuthorResponseDto> getFavouriteAuthors(@CurrentUser UserPrincipal userPrincipal) {
        return favoriteService.getFavouriteAuthors(userPrincipal.getId());
    }

    @GetMapping("/lectures")
    public List<FavouriteLectureResponseDto> getFavouriteLectures(@CurrentUser UserPrincipal userPrincipal) {
        return favoriteService.getFavouriteLectures(userPrincipal.getId());
    }

    @GetMapping("/paths")
    public List<FavouritePathResponseDto> getFavouritePaths(@CurrentUser UserPrincipal userPrincipal) {
        return favoriteService.getFavouritePaths(userPrincipal.getId());
    }

    @GetMapping("/articles")
    public List<FavouriteArticleDto> getFavouriteArticles(@CurrentUser UserPrincipal userPrincipal) {
        return favoriteService.getFavouriteArticles(userPrincipal.getId());
    }

}
