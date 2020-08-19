package com.knewless.core.student;

import com.knewless.core.currentUserCource.CurrentUserCourseService;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.history.WatchHistoryService;
import com.knewless.core.student.dto.StudentMainInfoDto;
import com.knewless.core.student.dto.StudentProfileDto;
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
    @Autowired
    private CurrentUserCourseService currentUserCourseService;
    @Autowired
    private WatchHistoryService watchHistoryService;


    public Optional<StudentSettingsDto> getStudentSettings(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return studentRepository.findByUser(user).map(StudentMapper::fromEntity);
    }

    public Optional<StudentSettingsDto> setStudentSettings(StudentSettingsDto settings) {
        User user = userRepository.findById(settings.getUserId()).orElseThrow();
        Optional<Student> oldSettings = studentRepository.findByUser(user);
        if (oldSettings.isEmpty()) {
            return Optional.of(studentRepository.save(StudentMapper.fromDto(settings, user)))
                    .map(StudentMapper::fromEntity);
        }
        Student updateSettings = StudentMapper.fromDto(settings, user);
        updateSettings.setCreatedAt(oldSettings.get().getCreatedAt());
        return Optional.of(studentRepository.save(updateSettings))
                .map(StudentMapper::fromEntity);
    }

    public StudentProfileDto getStudentProfile(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow();
        StudentProfileDto profile = new StudentProfileDto();
        profile.setTotalContentWatched((int) watchHistoryService.getTotalViewSeconds(userId));
        profile.setCourses(currentUserCourseService.getLearningCourses(userId));
        return profile;
    }

    public Optional<StudentMainInfoDto> getStudentByUserId(UUID id) {
        var studentDto = studentRepository.findByUserId(id).orElseThrow(
                () -> new ResourceNotFoundException("Student", "id", id));
        return StudentMapper.studentToStudentMainInfoDto(studentDto);
    }
}
