package com.knewless.core.author;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorSettingsDto;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/author")
public class AuthorController {

    private final AuthorService authorService;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    public Optional<AuthorSettingsDto> getSettings() {
        UUID userId = UUID.fromString("eaea544b-8383-49ee-90c6-2a169e5c560a");
        return authorService.getAuthorSettings(userId);
    }

    @PostMapping
    public Optional<AuthorSettingsDto> setSettings(@RequestBody AuthorSettingsDto settings) {
        settings.setUserId(UUID.fromString("eaea544b-8383-49ee-90c6-2a169e5c560a"));
        return authorService.setAuthorSettings(settings);
    }

    @GetMapping
    public ResponseEntity<AuthorBriefInfoDto> getAuthor(UUID authorId) {
        try {
            return ResponseEntity.ok(this.authorService.getAuthorInfoById(authorId));
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

}
