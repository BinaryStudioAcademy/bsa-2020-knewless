package com.knewless.core.favorite;

import com.knewless.core.course.CourseService;
import com.knewless.core.course.dto.FavouriteCourseResponseDto;
import com.knewless.core.db.SourceType;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.favorite.model.Favorite;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final CourseService courseService;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository, CourseService courseService) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.courseService = courseService;
    }

    public boolean checkIsFavorite(UUID userId, UUID favouriteId, SourceType type) {
        Optional<Favorite> favorite = favoriteRepository
                .findFavoriteByUserIdAndSourceIdAndSourceType(userId, favouriteId, type);
        if (favorite.isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    public boolean changeFavorite(UUID userId, UUID favouriteId, SourceType type) {
        Optional<Favorite> optionalFavorite = favoriteRepository
                .findFavoriteByUserIdAndSourceIdAndSourceType(userId, favouriteId, type);
        if (optionalFavorite.isPresent()) {
            favoriteRepository.deleteFavoriteById(optionalFavorite.get().getId());
            return false;
        } else {
            User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
            Favorite favorite = Favorite.builder().sourceId(favouriteId).sourceType(type)
                    .user(user).build();
            favoriteRepository.save(favorite);
            return true;
        }
    }

    public List<FavouriteCourseResponseDto> getFavouriteCourses(UUID userId) {
        List<Favorite> favorites = favoriteRepository.findFavoriteByUserIdAndSourceType(userId, SourceType.COURSE);
        List<UUID> courseUuids = favorites.stream().map(f->f.getSourceId()).collect(Collectors.toList());
        return courseService.getFavouriteCoursesByIds(courseUuids);
    }
}
