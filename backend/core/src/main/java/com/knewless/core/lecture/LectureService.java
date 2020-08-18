package com.knewless.core.lecture;

import com.knewless.core.fileManager.FileManager;
import com.knewless.core.lecture.Dto.LectureCreateResponseDto;
import com.knewless.core.lecture.Dto.ShortLectureDto;
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

import javassist.NotFoundException;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LectureService {

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

    public LectureCreateResponseDto saveLecture(MultipartFile file, String filename, UUID lectureId, int duration) throws NotFoundException {
        Lecture savedLecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new NotFoundException("Lecture with id " + lectureId + " not found"));
        String folderId = fileManager.saveVideo(file, filename);
        System.out.println("video saved");
        String[] concatString = filename.split("\\.");
        String fileType = concatString[concatString.length - 1];
        String relativePath = File.separator + "assets" + File.separator + "video" + File.separator + folderId +
                File.separator + folderId + "-origin." + fileType;
        lectureRepository.setDurationPath(lectureId, duration, relativePath);
        Message message = new Message();
        message.setEntityId(lectureId);
        message.setFolderId(folderId);
        message.setType(MessageType.REQUEST);
        messageSender.sendToFileProcessor(message);
        return LectureCreateResponseDto.builder()
                        .id(savedLecture.getId())
                        .description(savedLecture.getDescription())
                        .timeMinutes((duration/60) + 1)
                        .name(savedLecture.getName())
                        .build();
    }

    public LectureCreateResponseDto addLectureToDb(String name, String description, UUID userId) {
        User user = userRepository.getOne(userId);
        Lecture lecture = Lecture.builder().name(name).description(description).user(user).build();
        Lecture savedLecture = lectureRepository.save(lecture);
        return LectureCreateResponseDto.builder()
                .id(savedLecture.getId())
                .description(savedLecture.getDescription())
                .timeMinutes(savedLecture.getDuration())
                .name(savedLecture.getName())
                .build();
    }

    public List<ShortLectureDto> getLecturesByUserId(UUID id) {
        List<Lecture> allLectures = lectureRepository.getLecturesByUserId(id);
        List<Lecture> result = new ArrayList<>();
        allLectures.forEach(lec -> {
            if (!result.stream().map(Lecture::getSourceUrl).collect(Collectors.toList()).contains(lec.getSourceUrl())) {
                result.add(lec);
            }
            if (lec.getSourceUrl()==null && !result.stream().map(Lecture::getName).collect(Collectors.toList()).contains(lec.getName())) {
                result.add(lec);
            }
        });

        return result.stream()
                .map(l -> new ShortLectureDto(
                        l.getId(),
                        l.getName() == null ? "mockName" : l.getName(),
                        l.getDescription(),
                        l.getSourceUrl(),
                        l.getDuration() == 0? l.getDuration() : l.getDuration()/60 + 1))
                .collect(Collectors.toList());
    }

}
