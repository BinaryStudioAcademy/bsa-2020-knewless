package com.knewless.core.author;

import com.knewless.core.article.ArticleRepository;
import com.knewless.core.article.articleReaction.model.ArticleReaction;
import com.knewless.core.article.model.Article;
import com.knewless.core.author.dto.AuthorArticlesDto;
import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorPublicDto;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.author.mapper.AuthorInfoMapper;
import com.knewless.core.author.mapper.AuthorMapper;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.CourseRepository;
import com.knewless.core.school.SchoolRepository;
import com.knewless.core.school.dto.SchoolBriefInfoDto;
import com.knewless.core.school.mapper.SchoolInfoMapper;
import com.knewless.core.school.model.School;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.tag.dto.ArticleTagDto;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.model.User;
import com.knewless.core.user.role.model.RoleType;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    private final UserRepository userRepository;

    private final CourseRepository courseRepository;
    private final ArticleRepository articleRepository;
    private final SchoolRepository schoolRepository;

    @Autowired
    public AuthorService(AuthorRepository authorRepository,
                         UserRepository userRepository,
                         CourseRepository courseRepository,
                         ArticleRepository articleRepository,
                         SchoolRepository schoolRepository) {
        this.authorRepository = authorRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.articleRepository = articleRepository;
        this.schoolRepository = schoolRepository;
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

    public AuthorBriefInfoDto getAuthorInfoById(UUID id) throws NotFoundException {
        final var notFoundException = new NotFoundException("Author with id '" + id + "' not found");
        final var user = this.userRepository.findById(id).orElseThrow(() -> notFoundException);
        final var author = this.authorRepository.findByUserId(id).orElseThrow(() -> notFoundException);
        final var authorSchool = author.getSchool();
        final var membersCount = this.authorRepository.countBySchoolId(authorSchool.getId());
        final var schoolBriefInfo = SchoolInfoMapper.from(authorSchool, membersCount);
        return AuthorInfoMapper.fromEntities(author, user, schoolBriefInfo);
    }

    public AuthorPublicDto getAuthorPublicDto(UUID authorId, UserPrincipal userPrincipal) {
        // after merge you have to change userPrincipal to userId and find by userId
        var author = this.authorRepository.findOneById(authorId);
        var courses = this.courseRepository.getCoursesByAuthorId(authorId);
        var articles = this.articleRepository.getArticleDtoByAuthorId(authorId);
        var school = this.authorRepository.getSchoolByAuthorId(authorId);
        var printFollowButton = !this.userRepository.getUserRoleId(userPrincipal.getEmail()).equals(RoleType.AUTHOR);
        var numberOfSubscriptions = this.authorRepository.getNumberOfSubscriptions(authorId);
        System.out.println(userPrincipal.getEmail());

        var resultAuthorPublicDto = new AuthorPublicDto(author.getFirstName(),
                author.getLastName(),
                author.getAvatar(),
                author.getBiography(),
                school.getName(),
                school.getId().toString(),
                numberOfSubscriptions,
                courses, articles, printFollowButton);
        return resultAuthorPublicDto;
    }

}
