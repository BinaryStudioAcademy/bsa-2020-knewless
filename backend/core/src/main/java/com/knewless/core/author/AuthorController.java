package com.knewless.core.author;
import com.knewless.core.author.dto.AuthorSettingsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/author")
public class AuthorController {
    @Autowired
    private AuthorService authorService;
    @GetMapping
    public AuthorSettingsDto getSettings(){
        UUID userId =  UUID.fromString("eaea544b-8383-49ee-90c6-2a169e5c560a");
        return authorService.getAuthorSettings(userId);
    }

    @PostMapping
    public AuthorSettingsDto setSettings(@RequestBody AuthorSettingsDto settings){
        settings.setUserId(UUID.fromString("eaea544b-8383-49ee-90c6-2a169e5c560a"));
        return authorService.setAuthorSettings(settings);
    }
}
