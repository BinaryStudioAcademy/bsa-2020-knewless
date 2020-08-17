package com.knewless.core.lecture;

import com.knewless.core.lecture.Dto.LectureCreateResponseDto;
import com.knewless.core.lecture.Dto.SaveLectureDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/lecture")
public class LectureController {
    @Autowired
    private LectureService lectureService;

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE})
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping("/upload")
    public LectureCreateResponseDto saveLecture(@CurrentUser UserPrincipal userPrincipal,
                                               @RequestPart(value="image", required = true) MultipartFile image,
                                               @RequestPart(required=true) SaveLectureDto request) throws IOException {
        return lectureService.saveLecture(image,
                                          image.getOriginalFilename(),
                                          request.getId(),
                                          request.getDuration());
    }
    
    @PostMapping
    public LectureCreateResponseDto addLectureToDb(@CurrentUser UserPrincipal userPrincipal,
                                                   @RequestBody SaveLectureDto request) {
        return lectureService.addLectureToDb(request.getName(), request.getDescription(), userPrincipal.getId());
    }
}
