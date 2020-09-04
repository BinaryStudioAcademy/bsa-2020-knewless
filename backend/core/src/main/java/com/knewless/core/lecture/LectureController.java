package com.knewless.core.lecture;

import com.knewless.core.course.courseComment.CourseCommentMapper;
import com.knewless.core.course.courseComment.dto.CourseCommentDto;
import com.knewless.core.lecture.dto.LectureCreateResponseDto;
import com.knewless.core.lecture.dto.SaveLectureDto;
import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.lecture.lectureComment.LectureCommentMapper;
import com.knewless.core.lecture.lectureComment.LectureCommentService;
import com.knewless.core.lecture.lectureComment.dto.LectureCommentDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import com.knewless.core.validation.SingleMessageResponse;
import com.knewless.core.validation.ValidationMessageCreator;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/lecture")
public class LectureController {
    @Autowired
    private LectureService lectureService;
    @Autowired
    private LectureCommentService lectureCommentService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/save")
    public LectureCreateResponseDto saveLecture(@CurrentUser UserPrincipal userPrincipal,
                                                @RequestParam(value = "image") MultipartFile image,
                                                @RequestParam UUID id,
                                                @RequestParam int duration) throws NotFoundException {
        return lectureService.saveLecture(userPrincipal.getId(), image, image.getOriginalFilename(), id, duration);
    }

    @PostMapping
    public ResponseEntity<?> addLectureToDb(@Valid @RequestBody SaveLectureDto request,
                                            @CurrentUser UserPrincipal userPrincipal,
                                            Errors validationResult) {
        if (validationResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(new SingleMessageResponse(
                                    ValidationMessageCreator.createString(validationResult, " ")
                            )
                    );
        }
        return ResponseEntity.ok(
                lectureService.addLectureToDb(request, userPrincipal.getId())
        );
    }

    @GetMapping("/user")
    public List<ShortLectureDto> getLecturesByUser(@CurrentUser UserPrincipal userPrincipal) {
        return lectureService.getLecturesByUserId(userPrincipal.getId());
    }

    @PostMapping("/url")
    public ResponseEntity<?> saveLectureWithUrl(@CurrentUser UserPrincipal userPrincipal,
                                            @Valid @RequestBody SaveLectureDto request,
                                            Errors validationResult) {
        if (validationResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(new SingleMessageResponse(
                                    ValidationMessageCreator.createString(validationResult, " ")
                            )
                    );
        }
        return ResponseEntity.ok(
                lectureService.saveLectureWithUrl(request, userPrincipal.getId()));
    }
    
    @GetMapping("/{lectureId}/comments")
    public List<LectureCommentDto> getCommentsByCourse(@PathVariable("lectureId") UUID lectureId,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "2") int size) {
        return lectureCommentService.getCourseComments(lectureId, PageRequest.of(page, size)).stream()
                .map(LectureCommentMapper.MAPPER::commentToDto).collect(Collectors.toList());
    }
}
