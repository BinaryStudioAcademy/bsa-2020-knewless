package com.knewless.core.lecture;

import com.knewless.core.lecture.Dto.LectureCreateResponseDto;
import com.knewless.core.lecture.Dto.SaveLectureDto;
import com.knewless.core.lecture.Dto.ShortLectureDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import com.knewless.core.validation.SingleMessageResponse;
import com.knewless.core.validation.ValidationMessageCreator;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/lecture")
public class LectureController {
    @Autowired
    private LectureService lectureService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/save")
    public LectureCreateResponseDto saveLecture(@CurrentUser UserPrincipal userPrincipal,
                                                @RequestParam(value = "image", required = true) MultipartFile image,
                                                @RequestParam UUID id,
                                                @RequestParam int duration) throws NotFoundException {
        System.out.println(duration);
        return lectureService.saveLecture(image, image.getOriginalFilename(), id, duration);
    }

    @PostMapping
    public ResponseEntity<?> addLectureToDb(@CurrentUser UserPrincipal userPrincipal,
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
                lectureService.addLectureToDb(request.getName(), request.getDescription(), userPrincipal.getId())
        );
    }

    @GetMapping("/user")
    public List<ShortLectureDto> getLecturesByUser(@CurrentUser UserPrincipal userPrincipal) {
        return lectureService.getLecturesByUserId(userPrincipal.getId());
    }

}
