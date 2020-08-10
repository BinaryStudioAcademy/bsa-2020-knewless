package com.knewless.core.student;


import com.knewless.core.author.AuthorService;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.student.dto.StudentSettingsDto;
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
    public Optional<StudentSettingsDto> getSettings() {
        UUID userId = UUID.fromString("d1d9eb03-f80a-4f9b-9e84-202e7d88a7b9");
        return studentService.getStudentSettings(userId);
    }

    @PostMapping
    public Optional<StudentSettingsDto> setSettings(@RequestBody StudentSettingsDto settings) {
        settings.setUserId(UUID.fromString("d1d9eb03-f80a-4f9b-9e84-202e7d88a7b9"));
        return studentService.setStudentSettings(settings);
    }
}
