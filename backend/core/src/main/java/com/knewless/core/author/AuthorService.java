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


    public AuthorSettingsDto getAuthorSettings(UUID userId) {
        User user = userRepository.findById(userId).get();
       return AuthorMapper.fromEntity(authorRepository.findByUser(user).get());
      }

    public AuthorSettingsDto setAuthorSettings(AuthorSettingsDto settings) {
        User user = userRepository.findById(settings.getUserId()).get();
        Optional<Author> oldSettings = authorRepository.findByUser(user);
        if(!oldSettings.isPresent()){
         return AuthorMapper.fromEntity(authorRepository.save(AuthorMapper.fromDto(settings,user)));
        }
        Author updateSettings = AuthorMapper.fromDto(settings, user);
        updateSettings.setCreatedAt(oldSettings.get().getCreatedAt());
        return  AuthorMapper.fromEntity(authorRepository.save(updateSettings));
    }
}
