package com.knewless.core.author;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.author.mapper.AuthorInfoMapper;
import com.knewless.core.author.mapper.AuthorMapper;
import com.knewless.core.author.model.Author;
import com.knewless.core.school.dto.SchoolBriefInfoDto;
import com.knewless.core.school.mapper.SchoolInfoMapper;
import com.knewless.core.school.model.School;
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

    @Autowired
    public AuthorService(AuthorRepository authorRepository, UserRepository userRepository) {
        this.authorRepository = authorRepository;
        this.userRepository = userRepository;
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

}
