package com.knewless.core.author;

import com.knewless.core.article.ArticleRepository;
import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorPublicDto;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.author.mapper.AuthorInfoMapper;
import com.knewless.core.author.mapper.AuthorMapper;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.CourseRepository;
import com.knewless.core.exception.ResourceNotFoundException;
import com.knewless.core.school.mapper.SchoolInfoMapper;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.model.User;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final ArticleRepository articleRepository;

    @Autowired
    public AuthorService(AuthorRepository authorRepository,
                         UserRepository userRepository,
                         CourseRepository courseRepository,
                         ArticleRepository articleRepository) {
        this.authorRepository = authorRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.articleRepository = articleRepository;
    }

    public Optional<AuthorSettingsDto> getAuthorSettings(UUID userId) {
        User user = userRepository.findById(userId).get();
        return authorRepository.findByUser(user).map(AuthorMapper::fromEntity);
    }

    public Optional<AuthorSettingsDto> setAuthorSettings(AuthorSettingsDto settings) {
        User user = userRepository.findById(settings.getUserId()).get();
        Optional<Author> oldSettings = authorRepository.findByUser(user);
        if (!oldSettings.isPresent()) {
            return Optional.of(authorRepository.save(AuthorMapper.fromDto(settings, user)))
                    .map(AuthorMapper::fromEntity);
        }
        Author updateSettings = AuthorMapper.fromDto(settings, user);
        updateSettings.setCreatedAt(oldSettings.get().getCreatedAt());
        return Optional.of(authorRepository.save(updateSettings))
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
        return AuthorInfoMapper.fromEntities(author, authorFollowersCount, schoolBriefInfo);
    }

    public AuthorPublicDto getAuthorPublicDto(UUID authorId, UserPrincipal userPrincipal) throws NotFoundException {

        var author = this.authorRepository.findOneById(authorId)
                .orElseThrow(() -> new NotFoundException("Author with id " + authorId + " not found"));

        var courses = this.courseRepository.getLatestCoursesByAuthorId(authorId);
        var articles = this.articleRepository.getArticleDtoByAuthorId(authorId);

        var school = this.authorRepository.getSchoolByAuthorId(authorId);
        String schoolName = school.isPresent() ? school.get().getName() : "";
        String schoolId = school.isPresent() ? school.get().getId().toString() : "";

        var currentUserId = this.authorRepository.checkForCurrentUser(userPrincipal.getEmail());
        var printFollowButton = currentUserId.isPresent() ? !currentUserId.get().equals(authorId) : true;

        var numberOfSubscriptions = this.authorRepository.getNumberOfSubscriptions(authorId)
                .orElseThrow(() -> new NotFoundException("Cant find number of author subscribers " + authorId));

        return new AuthorPublicDto(author.getFirstName(),
                author.getLastName(),
                author.getAvatar(),
                author.getBiography(),
                schoolName,
                schoolId,
                numberOfSubscriptions,
                courses, articles, printFollowButton);
    }

}
