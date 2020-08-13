package com.knewless.core.author;

import com.knewless.core.article.ArticleRepository;
import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorPublicDto;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/author")
public class AuthorController {

    private final AuthorService authorService;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    public Optional<AuthorSettingsDto> getSettings(@CurrentUser UserPrincipal userPrincipal) {
        return authorService.getAuthorSettings(userPrincipal.getId());
    }

    @PostMapping
    public Optional<AuthorSettingsDto> setSettings(@CurrentUser UserPrincipal userPrincipal,
                                                   @RequestBody AuthorSettingsDto settings) {
        settings.setUserId(userPrincipal.getId());
        return authorService.setAuthorSettings(settings);
    }

    @GetMapping("/{authorId}")
    public ResponseEntity<AuthorBriefInfoDto> getAuthor(@PathVariable UUID authorId) {
        try {
            return ResponseEntity.ok(this.authorService.getAuthorInfoById(authorId));
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    @GetMapping("/overview/{authorId}")
    public ResponseEntity<?> getPublicAuthor(@PathVariable UUID authorId, @CurrentUser UserPrincipal userPrincipal) {
        try {
            return new ResponseEntity<>(this.authorService.getAuthorPublicDto(authorId, userPrincipal), HttpStatus.OK);
        } catch (NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

}
