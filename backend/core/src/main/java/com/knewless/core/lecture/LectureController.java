package com.knewless.core.lecture;

import com.knewless.core.lecture.Dto.LectureCreateResponseDto;
import com.knewless.core.lecture.Dto.SaveLectureDto;
import com.knewless.core.lecture.Dto.ShortLectureDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import javassist.NotFoundException;
import org.apache.tomcat.util.http.fileupload.FileItemIterator;
import org.apache.tomcat.util.http.fileupload.FileItemStream;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.util.Streams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/lecture")
public class LectureController {
    @Autowired
    private LectureService lectureService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{id}/{duration}")
    public LectureCreateResponseDto saveLecture(@CurrentUser UserPrincipal userPrincipal,
                                                @RequestParam(value="image", required = true) MultipartFile image,
                                                @PathVariable UUID id,
                                                @PathVariable int duration) throws NotFoundException {
        return lectureService.saveLecture(image, image.getOriginalFilename(), id, duration);
    }
    
    @PostMapping
    public LectureCreateResponseDto addLectureToDb(@CurrentUser UserPrincipal userPrincipal,
                                                   @RequestBody SaveLectureDto request) {
        return lectureService.addLectureToDb(request.getName(), request.getDescription(), userPrincipal.getId());
    }

    @GetMapping("/user")
    public List<ShortLectureDto> getLecturesByUser(@CurrentUser UserPrincipal userPrincipal) {
        return lectureService.getLecturesByUserId(userPrincipal.getId());
    }
}
