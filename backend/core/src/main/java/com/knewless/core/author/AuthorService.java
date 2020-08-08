package com.knewless.core.author;

import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.author.mapper.AuthorMapper;
import com.knewless.core.author.model.Author;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private UserRepository userRepository;


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
}
