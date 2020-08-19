package com.knewless.core.student;

import com.knewless.core.currentUserCource.CurrentUserCourseService;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.history.WatchHistoryService;
import com.knewless.core.student.dto.StudentMainInfoDto;
import com.knewless.core.student.dto.StudentProfileDto;
import com.knewless.core.student.dto.StudentSettingsDto;
import com.knewless.core.student.mapper.StudentMapper;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final CurrentUserCourseService currentUserCourseService;
    private final TagRepository tagRepository;
    private final WatchHistoryService watchHistoryService;

    @Autowired
    public StudentService(StudentRepository studentRepository, UserRepository userRepository,
                          CurrentUserCourseService currentUserCourseService, TagRepository tagRepository,
                          WatchHistoryService watchHistoryService) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.currentUserCourseService = currentUserCourseService;
        this.tagRepository = tagRepository;
        this.watchHistoryService = watchHistoryService;
    }

    public Optional<StudentSettingsDto> getStudentSettings(UUID userId) {
        var user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId)
        );
        var searchingTags = tagRepository.getTagsByUserId(user.getId());
        var student = studentRepository.findByUser(user).orElseThrow(
                () -> new ResourceNotFoundException("Student", "userId", userId)
        );
        var result = StudentMapper.fromEntity(student);
        result.setTags(searchingTags);
        return Optional.of(result);
    }

    public Optional<StudentSettingsDto> setStudentSettings(StudentSettingsDto settings) {
        var user = userRepository.findById(settings.getUserId()).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", settings.getUserId())
        );
        user.setTags(settings.getTags().stream().map(t -> {
            var tempTag = new Tag();
            tempTag.setId(t);
            return tempTag;
        }).collect(Collectors.toSet()));

        var oldSettings = studentRepository.findByUser(user);
        if (oldSettings.isEmpty()) {
            return Optional.of(studentRepository.save(StudentMapper.fromDto(settings, user)))
                    .map(StudentMapper::fromEntity);
        }
        var updateSettings = StudentMapper.fromDto(settings, user);
        updateSettings.setCreatedAt(oldSettings.get().getCreatedAt());
        return Optional.of(studentRepository.save(updateSettings)).map(StudentMapper::fromEntity);
    }

    public StudentProfileDto getStudentProfile(UUID userId) {
        final var user = this.userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", userId)
        );
        var profile = new StudentProfileDto();
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
