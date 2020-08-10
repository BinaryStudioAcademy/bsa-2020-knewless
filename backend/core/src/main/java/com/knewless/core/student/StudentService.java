package com.knewless.core.student;

import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.author.mapper.AuthorMapper;
import com.knewless.core.author.model.Author;
import com.knewless.core.student.dto.StudentSettingsDto;
import com.knewless.core.student.mapper.StudentMapper;
import com.knewless.core.student.model.Student;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;


    public Optional<StudentSettingsDto> getStudentSettings(UUID userId) {
        User user = userRepository.findById(userId).get();
        return studentRepository.findByUser(user).map(StudentMapper::fromEntity);
    }

    public Optional<StudentSettingsDto> setStudentSettings(StudentSettingsDto settings) {
        User user = userRepository.findById(settings.getUserId()).get();
        Optional<Student> oldSettings = studentRepository.findByUser(user);
        if (!oldSettings.isPresent()) {
            return Optional.of(studentRepository.save(StudentMapper.fromDto(settings, user)))
                    .map(StudentMapper::fromEntity);
        }
        Student updateSettings = StudentMapper.fromDto(settings, user);
        updateSettings.setCreatedAt(oldSettings.get().getCreatedAt());
        return Optional.of(studentRepository.save(updateSettings))
                .map(StudentMapper::fromEntity);
    }
}
