package com.knewless.core.favorite;

import com.knewless.core.author.AuthorService;
import com.knewless.core.author.dto.FavouriteAuthorResponseDto;
import com.knewless.core.course.CourseRepository;
import com.knewless.core.course.CourseService;
import com.knewless.core.course.dto.FavouriteCourseResponseDto;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.SourceType;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.favorite.model.Favorite;
import com.knewless.core.lecture.Dto.FavouriteLectureResponseDto;
import com.knewless.core.lecture.LectureMapper;
import com.knewless.core.lecture.LectureService;
import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.path.PathService;
import com.knewless.core.path.dto.FavouritePathResponseDto;
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
    private final AuthorService authorService;
    private final PathService pathService;
    @Autowired
    private LectureService lectureService;
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository, CourseService courseService,
                           AuthorService authorService, PathService pathService) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.courseService = courseService;
        this.authorService = authorService;
        this.pathService = pathService;
    }

    public boolean checkIsFavorite(UUID userId, UUID favouriteId, SourceType type) {
        Optional<Favorite> favorite = favoriteRepository
                .findFavoriteByUserIdAndSourceIdAndSourceType(userId, favouriteId, type);
        return favorite.isPresent();
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
        return courseService.getFavouriteCoursesByUser(userId);
    }

    public List<FavouriteAuthorResponseDto> getFavouriteAuthors(UUID userId) {
        return authorService.getFavouriteAuthorsByUser(userId);
    }

    public List<FavouriteLectureResponseDto> getFavouriteLectures(UUID userId) {
        return lectureService.getFavouriteLecturesByUser(userId);
    }

    public List<FavouritePathResponseDto> getFavouritePaths(UUID userId) {
        return pathService.getFavouritePathsByUser(userId);
    }

    public List<ShortLectureDto> checkFavouriteLectures(UUID userId, List<ShortLectureDto> lectures) {
        if (userId == null) return lectures;
        List<Favorite> favorites = favoriteRepository.findFavoriteByUserIdAndSourceType(userId, SourceType.LECTURE);
        List<UUID> lectureUuids = favorites.stream().map(f->f.getSourceId()).collect(Collectors.toList());
        lectures.forEach(l->l.setFavourite(lectureUuids.contains(l.getId())));
        return lectures;
    }

    public List<com.knewless.core.lecture.dto.LectureDto> checkFavouriteLecturesToPlayer(UUID userId, List<com.knewless.core.lecture.dto.LectureDto> lectures) {
        if (userId == null) return lectures;
        List<Favorite> favorites = favoriteRepository.findFavoriteByUserIdAndSourceType(userId, SourceType.LECTURE);
        List<UUID> lectureUuids = favorites.stream().map(f->f.getSourceId()).collect(Collectors.toList());
        lectures.forEach(l->l.setFavourite(lectureUuids.contains(l.getId())));
        return lectures;
    }

    public List<ShortLectureDto> getFavouriteLecturesInCourse(UUID userId, UUID courseId) {
        List<Favorite> favorites = favoriteRepository.findFavoriteByUserIdAndSourceType(userId, SourceType.LECTURE);
        List<UUID> lectureUuids = favorites.stream().map(f->f.getSourceId()).collect(Collectors.toList());
        Course courseEntity = courseRepository.findById(courseId).orElseThrow(
                () -> new ResourceNotFoundException("Course", "id", courseId));
        List<ShortLectureDto> result = courseEntity.getLectures()
                .stream()
                .map(LectureMapper.MAPPER::lectureToShortLectureDto)
                .collect(Collectors.toList());
        return checkFavouriteLectures(userId, result);
    }
}
