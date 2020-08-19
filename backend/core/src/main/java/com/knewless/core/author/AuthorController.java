package com.knewless.core.author;

import com.knewless.core.author.dto.AuthorBriefInfoDto;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import com.knewless.core.validation.SingleMessageResponse;
import com.knewless.core.validation.ValidationMessageCreator;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
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
    public Optional<AuthorSettingsDto> getSettings(@CurrentUser UserPrincipal userPrincipal) {
        return authorService.getAuthorSettings(userPrincipal.getId());
    }

    @PostMapping
    public ResponseEntity<?> setSettings(@CurrentUser UserPrincipal userPrincipal,
                                         @Valid @RequestBody AuthorSettingsDto settings,
                                         Errors validationResult) {
        if (validationResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(new SingleMessageResponse(
                                    ValidationMessageCreator.createString(validationResult, " ")
                            )
                    );
        }
        final var currentUserId = userPrincipal.getId();
        if (currentUserId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User id cannot be null.");
        }
        settings.setUserId(currentUserId);
        return ResponseEntity.ok(authorService.setAuthorSettings(settings));
    }

    @GetMapping("/self-info")
    public ResponseEntity<AuthorBriefInfoDto> getAuthorInfo(@CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok(this.authorService.getAuthorInfoByUserId(userPrincipal.getId()));
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
