package com.knewless.core.lecture;

import com.knewless.core.fileManager.FileManager;
import com.knewless.core.lecture.Dto.LectureCreateResponseDto;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.messaging.Message;
import com.knewless.core.messaging.MessageSender;
import com.knewless.core.messaging.MessageType;
import com.knewless.core.user.UserRepository;
import com.knewless.core.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Optional;
import java.util.UUID;

@Service
public class LectureService {
    @Value(value = "${fs.video_url}")
    private String VIDEO_URL;

    private final LectureRepository lectureRepository;
    private final FileManager fileManager;
    private final MessageSender messageSender;
    private final UserRepository userRepository;

    @Autowired
    public LectureService(LectureRepository lectureRepository, FileManager fileManager,
                          MessageSender messageSender, UserRepository userRepository) {
        this.fileManager = fileManager;
        this.lectureRepository = lectureRepository;
        this.messageSender = messageSender;
        this.userRepository = userRepository;
    }

    public LectureCreateResponseDto saveLecture(MultipartFile file, String filename, UUID lectureId) {
        System.out.println("save service");
        String[] concatString = filename.split("\\.");
        String fileType = concatString[concatString.length - 1];
        String folderId = fileManager.saveVideo(file, filename);
        String relativePath = folderId + "/" + folderId + "-origin." + fileType;
        String videoLink = VIDEO_URL + relativePath;
        Message message = new Message();
        lectureRepository.setLinkDuration(lectureId, videoLink, 10);
        message.setEntityId(lectureId);
        message.setFolderId(folderId);
        message.setType(MessageType.REQUEST);
        messageSender.sendToFileProcessor(message);
        Optional<Lecture> optionalSavedLecture = lectureRepository.findById(lectureId);
        LectureCreateResponseDto result = LectureCreateResponseDto.builder()
                .link(videoLink)
                .id(optionalSavedLecture.get().getId())
                .description(optionalSavedLecture.get().getDescription())
                .timeMinutes(optionalSavedLecture.get().getDuration())
                .name(optionalSavedLecture.get().getName())
                .build();
        return LectureCreateResponseDto.builder()
                        .link(videoLink)
                        .id(optionalSavedLecture.get().getId())
                        .description(optionalSavedLecture.get().getDescription())
                        .timeMinutes(optionalSavedLecture.get().getDuration())
                        .name(optionalSavedLecture.get().getName())
                        .build();
    }


    public LectureCreateResponseDto addLectureToDb(String name, String description, UUID userId) {
        System.out.println("add service");
        User user = userRepository.getOne(userId);
        Lecture lecture = Lecture.builder().name(name).description(description).user(user).build();
        Lecture savedLecture = lectureRepository.save(lecture);
        return LectureCreateResponseDto.builder()
                .id(savedLecture.getId())
                .link("")
                .description(savedLecture.getDescription())
                .timeMinutes(0)
                .name(savedLecture.getName())
                .build();
    }
}
