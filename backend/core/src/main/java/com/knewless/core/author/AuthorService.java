package com.knewless.core.author;

import com.knewless.core.article.ArticleRepository;
import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorPublicDto;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.author.dto.FavouriteAuthorResponseDto;
import com.knewless.core.author.mapper.AuthorInfoMapper;
import com.knewless.core.author.mapper.AuthorMapper;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.CourseMapper;
import com.knewless.core.course.CourseRepository;
import com.knewless.core.db.SourceType;
import com.knewless.core.elasticsearch.EsService;
import com.knewless.core.elasticsearch.model.EsDataType;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.path.PathRepository;
import com.knewless.core.school.mapper.SchoolInfoMapper;
import com.knewless.core.school.model.School;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.subscription.SubscriptionService;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.dto.TagDto;
import com.knewless.core.user.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    private final UserRepository userRepository;

    private final CourseRepository courseRepository;

    private final PathRepository pathRepository;

    private final ArticleRepository articleRepository;

    private final SubscriptionService subscriptionService;

    private final EsService esService;

    private final TagRepository tagRepository;

    @Autowired
    public AuthorService(AuthorRepository authorRepository,
                         UserRepository userRepository,
                         CourseRepository courseRepository,
                         SubscriptionService subscriptionService,
                         ArticleRepository articleRepository,
                         PathRepository pathRepository,
                         EsService esService, TagRepository tagRepository) {
        this.authorRepository = authorRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.articleRepository = articleRepository;
        this.subscriptionService = subscriptionService;
        this.esService = esService;
        this.pathRepository = pathRepository;
        this.tagRepository = tagRepository;
    }

    public Optional<AuthorSettingsDto> getAuthorSettings(UUID userId) {
        final var user = this.userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("AuthorSettings", "userId", userId)
        );
        return this.authorRepository.findByUser(user).map(AuthorMapper::fromEntity);
    }

    public Optional<AuthorSettingsDto> setAuthorSettings(AuthorSettingsDto settings) {
        final var user = this.userRepository.findById(settings.getUserId()).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", settings.getUserId())
        );
        final var oldSettings = this.authorRepository.findByUser(user);
        if (oldSettings.isEmpty()) {
            Author author = authorRepository.save(AuthorMapper.fromDto(settings, user));
            CompletableFuture.runAsync(() -> esService.put(EsDataType.AUTHOR, author));

            return Optional.of(author)
                    .map(AuthorMapper::fromEntity);
        }
        final var updateSettings = AuthorMapper.fromDto(settings, user);
        updateSettings.setCreatedAt(oldSettings.get().getCreatedAt());
        return Optional.of(this.authorRepository.save(updateSettings))
                .map(AuthorMapper::fromEntity);
    }

    public AuthorBriefInfoDto getAuthorInfoByUserId(UUID userId) {
        final var author = this.authorRepository.findByUserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Author", "id", userId)
        );
        final var authorSchool = author.getSchool();
        final var isAuthorHasSchool = authorSchool != null;
        final var schoolMembersCount = isAuthorHasSchool
                ? this.authorRepository.countBySchoolId(authorSchool.getId())
                : 0;
        final var schoolBriefInfo = SchoolInfoMapper.from(authorSchool, schoolMembersCount);
        final var authorFollowersCount = this.authorRepository.getNumberOfSubscriptions(author.getId()).orElse(0);
        return AuthorInfoMapper.fromEntities(author, authorFollowersCount, schoolBriefInfo, userId);
    }

    public AuthorPublicDto getAuthorPublicDto(UUID authorId, UserPrincipal userPrincipal) throws NotFoundException {
        final var author = this.authorRepository.findOneById(authorId).orElseThrow(
                () -> new NotFoundException("Author with id " + authorId + " not found")
        );
        final var authorCourses = courseRepository.getLatestCoursesByAuthorId(authorId).stream()
                .map(CourseMapper.MAPPER::authorCourseQueryResultToAuthorCourseWithTagsDto)
                .collect(Collectors.toUnmodifiableList());
        for (var course : authorCourses) {
            final var courseTags = this.tagRepository.getTagsByCourseId(course.getId()).stream()
                    .filter(Objects::nonNull)
                    .map(tag -> new TagDto(tag.getId(), tag.getName(), tag.getSource()))
                    .collect(Collectors.toUnmodifiableList());
            course.setTags(courseTags);
        }
        final var articles = this.articleRepository.getArticleDtoByAuthorId(authorId);
        final var school = this.authorRepository.getSchoolByAuthorId(authorId);
        final var schoolId = school.map(School::getId).map(UUID::toString).orElse("");
        final var schoolName = school.map(School::getName).orElse("");
        final var isSubscribed = !subscriptionService.isSubscribe(userPrincipal.getId(), authorId, SourceType.AUTHOR);
        final var subscribesCount = this.authorRepository.getNumberOfSubscriptions(authorId).orElse(0);
        return new AuthorPublicDto(
                author.getId() ,author.getUser().getId(), author.getFirstName(), author.getLastName(), author.getAvatar(),
                author.getBiography(), schoolName, schoolId, subscribesCount, authorCourses, articles, isSubscribed
        );
    }

    public List<FavouriteAuthorResponseDto> getFavouriteAuthorsByUser(UUID userId) {
        List<Author> authors = authorRepository.getFavouriteAuthorsByUserId(userId, SourceType.AUTHOR);
        List<FavouriteAuthorResponseDto> result = new ArrayList<>();
        authors.forEach(a -> result.add(com.knewless.core.author.AuthorMapper.MAPPER.authorToFavouriteAuthorResponseDto(a)));
        result.forEach(a->a.setFollowers(authorRepository.getNumberOfSubscriptions(a.getId()).orElse(0)));
        result.forEach(a->a.setCourses(courseRepository.findAllByAuthorId(a.getId()).stream()
                .filter(c ->c.getReleasedDate() != null).collect(Collectors.toList()).size()));
        result.forEach(a->a.setPaths(pathRepository.findAllByAuthorId(a.getId()).size()));
        return result;
    }
}
