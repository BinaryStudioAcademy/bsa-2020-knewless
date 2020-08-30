package com.knewless.core.lecture;

import com.knewless.core.db.SourceType;
import com.knewless.core.emailservice.EmailService;
import com.knewless.core.fileManager.FileManager;
import com.knewless.core.lecture.Dto.FavouriteLectureResponseDto;
import com.knewless.core.lecture.dto.LectureCreateResponseDto;
import com.knewless.core.lecture.dto.SaveLectureDto;
import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.messaging.Message;
import com.knewless.core.messaging.MessageSender;
import com.knewless.core.messaging.MessageType;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javassist.NotFoundException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LectureService {

    private final LectureRepository lectureRepository;
    private final FileManager fileManager;
    private final MessageSender messageSender;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final EmailService emailService;

    @Autowired
    public LectureService(LectureRepository lectureRepository, FileManager fileManager,
                          MessageSender messageSender, UserRepository userRepository, TagRepository tagRepository,
                          EmailService emailService) {
        this.fileManager = fileManager;
        this.lectureRepository = lectureRepository;
        this.messageSender = messageSender;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.emailService = emailService;
    }

    public LectureCreateResponseDto saveLecture(MultipartFile file, String filename, UUID lectureId, int duration)
            throws NotFoundException {
        Lecture savedLecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new NotFoundException("Lecture with id " + lectureId + " not found"));
        String folderId = fileManager.saveVideo(file, filename);
        String[] concatString = filename.split("\\.");
        String fileType = concatString[concatString.length - 1];
        String relativePath = "assets/video/"+folderId +"/"+ folderId + "-origin." + fileType;
        lectureRepository.setDurationPath(lectureId, duration, relativePath);
        Message message = new Message();
        message.setEntityId(lectureId);
        message.setFolderId(folderId);
        message.setType(MessageType.REQUEST);
        messageSender.sendToFileProcessor(message);
        return LectureCreateResponseDto.builder()
                        .id(savedLecture.getId())
                        .description(savedLecture.getDescription())
                        .timeSeconds(duration)
                        .name(savedLecture.getName())
                        .build();
    }

    public LectureCreateResponseDto addLectureToDb(SaveLectureDto lectureDto, UUID userId) {
        var lecture = new Lecture();
        var user = userRepository.getOne(userId);
        lecture.setUser(user);
        var lectureTags = tagRepository.findAllById(lectureDto.getTagsIds());
        lecture.setTags(new HashSet<>(lectureTags));
        lecture.setName(lectureDto.getName());
        lecture.setDescription(lectureDto.getDescription());
        var savedLecture = lectureRepository.save(lecture);
        return LectureCreateResponseDto.builder()
                .id(savedLecture.getId())
                .description(savedLecture.getDescription())
                .timeSeconds(savedLecture.getDuration())
                .name(savedLecture.getName())
                .build();
    }

    public List<ShortLectureDto> getLecturesByUserId(UUID id) {
        List<Lecture> allLectures = lectureRepository.getLecturesByUserId(id);
        List<Lecture> result = new ArrayList<>();
        allLectures.forEach(lec -> {
            if (!result.stream().map(Lecture::getName).collect(Collectors.toList()).contains(lec.getName())) {
                result.add(lec);
            }
        });

        return result.stream()
                .map(l -> new ShortLectureDto(
                        l.getId(),
                        l.getName() == null ? "mockName" : l.getName(),
                        l.getDescription(),
                        l.getWebLink(),
                        l.getUrlOrigin(),
                        l.getUrl1080(),
                        l.getUrl720(),
                        l.getUrl480(),
                        l.getDuration(),
                        false))
                .collect(Collectors.toList());
    }

    public List<FavouriteLectureResponseDto> getFavouriteLecturesByUser(UUID userId){
        List<Lecture> lectures = lectureRepository.getFavouriteLecturesByUserId(userId, SourceType.LECTURE);
        List<FavouriteLectureResponseDto> result = new ArrayList<>();
        lectures.forEach(l-> result.add(LectureMapper.MAPPER.lectureToFavouriteLectureResponseDto(l)));
        return result;
    }

    public LectureCreateResponseDto saveLectureWithUrl(SaveLectureDto lectureDto, UUID userId) {

        var user = userRepository.getOne(userId);
        var lectureTags = tagRepository.findAllById(lectureDto.getTagsIds());
        Lecture lecture = Lecture.builder()
                                .name(lectureDto.getName())
                                .description(lectureDto.getDescription())
                                .webLink(lectureDto.getUrl())
                                .tags(new HashSet<>(lectureTags))
                                .user(user)
                                .duration((int) lectureDto.getDuration())
                                .build();
        Lecture savedLecture = lectureRepository.save(lecture);
        return LectureCreateResponseDto.builder()
                .id(savedLecture.getId())
                .description(savedLecture.getDescription())
                .timeSeconds(savedLecture.getDuration())
                .name(savedLecture.getName())
                .build();
    }

}
