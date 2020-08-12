package com.knewless.core.student;


import com.knewless.core.author.AuthorService;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.student.dto.StudentSettingsDto;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping
    public Optional<StudentSettingsDto> getSettings(@CurrentUser UserPrincipal userPrincipal) {
        return studentService.getStudentSettings(userPrincipal.getId());
    }

    @PostMapping
    public Optional<StudentSettingsDto> setSettings(@CurrentUser UserPrincipal userPrincipal,
                                                    @RequestBody StudentSettingsDto settings) {
        settings.setUserId(userPrincipal.getId());
        return studentService.setStudentSettings(settings);
    }
}
