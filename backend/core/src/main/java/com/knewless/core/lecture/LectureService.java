package com.knewless.core.lecture;

import com.knewless.core.db.BaseEntity;
import com.knewless.core.db.SourceType;
import com.knewless.core.emailservice.EmailService;
import com.knewless.core.fileManager.FileManager;
import com.knewless.core.lecture.Dto.FavouriteLectureResponseDto;
import com.knewless.core.lecture.dto.LectureCreateResponseDto;
import com.knewless.core.lecture.dto.LectureUpdateDto;
import com.knewless.core.lecture.dto.SaveLectureDto;
import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.lecture.mapper.LectureEditMapper;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.messaging.Message;
import com.knewless.core.messaging.MessageSender;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

import static com.knewless.core.youtube.YoutubeHelper.extractYoutubePreview;
import static com.knewless.core.youtube.YoutubeHelper.isYoutubeLink;

@Service
public class LectureService {

    private final LectureRepository lectureRepository;
    private final FileManager fileManager;
    private final MessageSender messageSender;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    @Autowired
    public LectureService(LectureRepository lectureRepository, FileManager fileManager,
                          MessageSender messageSender, UserRepository userRepository, TagRepository tagRepository) {
        this.fileManager = fileManager;
        this.lectureRepository = lectureRepository;
        this.messageSender = messageSender;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
    }

    public LectureCreateResponseDto saveLecture(UUID userId, MultipartFile file, String filename, UUID lectureId, int duration)
            throws NotFoundException {
        Lecture savedLecture = lectureRepository.findById(lectureId)
                .orElseThrow(() -> new NotFoundException("Lecture with id " + lectureId + " not found"));
        String folderId = fileManager.saveVideo(file, filename);
        String[] concatString = filename.split("\\.");
        String fileType = concatString[concatString.length - 1];
        String relativePath = "assets/video/"+folderId +"/"+ folderId + "-origin." + fileType;
        lectureRepository.setDurationPath(lectureId, duration, relativePath);
        var message = Message.builder()
                .entityId(lectureId)
                .folderId(folderId)
                .userId(userId)
                .build();
        messageSender.sendToFileProcessor(message);
        return LectureCreateResponseDto.builder()
                        .id(savedLecture.getId())
                        .description(savedLecture.getDescription())
                        .timeSeconds(duration)
                        .name(savedLecture.getName())
                        .build();
    }

    public LectureCreateResponseDto addLectureToDb(SaveLectureDto lectureDto, UUID userId) {
        if (lectureDto.getId() != null) {
            var lectureUpdate = lectureRepository.findById(lectureDto.getId()).orElseThrow();
            var lectureTags = tagRepository.findAllById(lectureDto.getTagsIds());
            lectureUpdate.setName(lectureDto.getName());
            lectureUpdate.setDescription(lectureDto.getDescription());
            lectureUpdate.setTags(new HashSet<>(lectureTags));
            lectureUpdate.setWebLink(null);
            lectureRepository.save(lectureUpdate);
            return LectureCreateResponseDto.builder()
                    .id(lectureUpdate.getId())
                    .description(lectureUpdate.getDescription())
                    .timeSeconds(lectureUpdate.getDuration())
                    .name(lectureUpdate.getName())
                    .build();
        } else {
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
    }

    public List<ShortLectureDto> getLecturesByUserId(UUID id) {
        List<Lecture> allLectures = lectureRepository.getAllByUserId(id);
        allLectures.sort(Comparator.comparingInt(l -> (l.getCourse() == null ? Integer.MIN_VALUE : Integer.MAX_VALUE)));
        List<Lecture> result = new ArrayList<>();
        allLectures.forEach(lec -> {
            if (lec.getUrlOrigin()!=null &&
                    !result.stream()
                            .filter(l-> l.getName().equals(lec.getName()))
                            .map(Lecture::getUrlOrigin).collect(Collectors.toList()).contains(lec.getUrlOrigin()))  {
                result.add(lec);
            }
            if (lec.getWebLink()!=null &&
                    !result.stream()
                            .filter(l-> l.getName().equals(lec.getName()))
                            .map(Lecture::getUrlOrigin).collect(Collectors.toList()).contains(lec.getWebLink()))  {
                result.add(lec);
            }
            if (lec.getUrlOrigin()==null && lec.getWebLink()==null) result.add(lec);
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
                        l.getPreviewImage(),
                        l.getDuration(),
                        false,
                        l.getIndex(),
                        l.getTags().stream().map(Tag::getId).collect(Collectors.toList())))
                .collect(Collectors.toList());
    }

    public List<FavouriteLectureResponseDto> getFavouriteLecturesByUser(UUID userId){
        List<Lecture> lectures = lectureRepository.getFavouriteLecturesByUserId(userId, SourceType.LECTURE);
        List<FavouriteLectureResponseDto> result = new ArrayList<>();
        lectures.forEach(l-> result.add(LectureMapper.MAPPER.lectureToFavouriteLectureResponseDto(l)));
        return result;
    }

    public LectureCreateResponseDto saveLectureWithUrl(SaveLectureDto lectureDto, UUID userId) {
        if (lectureDto.getId() != null) {
            var lectureUpdate = lectureRepository.findById(lectureDto.getId()).orElseThrow();
            var lectureTags = tagRepository.findAllById(lectureDto.getTagsIds());
            lectureUpdate.setName(lectureDto.getName());
            lectureUpdate.setUrlOrigin(null);
            lectureUpdate.setUrl480(null);
            lectureUpdate.setUrl720(null);
            lectureUpdate.setUrl1080(null);
            lectureUpdate.setDescription(lectureDto.getDescription());
            lectureUpdate.setWebLink(lectureDto.getUrl());
            lectureUpdate.setDuration((int) lectureDto.getDuration());
            lectureUpdate.setTags(new HashSet<>(lectureTags));
            lectureRepository.save(lectureUpdate);
            return LectureCreateResponseDto.builder()
                    .id(lectureUpdate.getId())
                    .description(lectureUpdate.getDescription())
                    .timeSeconds(lectureUpdate.getDuration())
                    .name(lectureUpdate.getName())
                    .tags(lectureTags.stream().map(BaseEntity::getId).collect(Collectors.toList()))
                    .build();
        } else {
            var user = userRepository.getOne(userId);
            var lectureTags = tagRepository.findAllById(lectureDto.getTagsIds());
            Lecture lecture = Lecture.builder()
                    .name(lectureDto.getName())
                    .description(lectureDto.getDescription())
                    .webLink(lectureDto.getUrl())
                    .previewImage(isYoutubeLink(lectureDto.getUrl()) ? extractYoutubePreview(lectureDto.getUrl()) : null)
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
                    .tags(lectureTags.stream().map(BaseEntity::getId).collect(Collectors.toList()))
                    .build();
        }
    }
    
    public LectureUpdateDto getLectureForEdit(UUID lectureId) {
        var lecture = lectureRepository.findById(lectureId).orElseThrow();
        return LectureEditMapper.fromEntity(lecture);
    }
}
