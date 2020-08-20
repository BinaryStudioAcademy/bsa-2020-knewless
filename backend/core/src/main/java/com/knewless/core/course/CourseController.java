package com.knewless.core.course;

import com.knewless.core.course.dto.*;
import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import com.knewless.core.validation.SingleMessageResponse;
import com.knewless.core.validation.ValidationMessageCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/course")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/recommended/{id}")
    private List<CourseDto> getRecommendedCourses(@PathVariable("id") UUID id,
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10") int size) {
        return courseService.getRecommendedCourses(id, PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    private CourseDto getCourseById(@PathVariable("id") UUID id) {
        return courseService.getCourseById(id);
    }

    @GetMapping("/{id}/info")
    private CourseFullInfoDto getAllCourseInfoById(@PathVariable("id") UUID id) {
        return courseService.getAllCourseInfoById(id);
    }

    @PostMapping("/create")
    private ResponseEntity<?> createCourse(@CurrentUser UserPrincipal user,
                                           @Valid @RequestBody CreateCourseRequestDto request,
                                           Errors validationResult) {
        if (validationResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(new SingleMessageResponse(
                                    ValidationMessageCreator.createString(validationResult, " ")
                            )
                    );
        }
        try {
            return ResponseEntity.ok(courseService.createCourse(request, user.getId()));
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.badRequest().body(new SingleMessageResponse(ex.getMessage()));
        }
    }

    @GetMapping("/lecture/{lectureId}")
    public CourseToPlayerDto getCourseByLectureId(@PathVariable UUID lectureId) {
        return courseService.getCourseByLectureId(lectureId);
    }

    @GetMapping("/author-latest/{authorId}")
    public ResponseEntity<List<AuthorCourseDto>> getAuthorLatestCourses(@PathVariable UUID authorId) {
        return ResponseEntity.ok(courseService.getLatestCoursesByAuthorId(authorId));
    }

    @GetMapping("author")
    public List<CourseWithMinutesDto> getCoursesByAuthor(@CurrentUser UserPrincipal user) {
        return courseService.getCoursesWithMinutesByUserId(user.getId());
    }

    @GetMapping
    public List<CourseDto> getCourses(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "10") int size) {
        return courseService.getCourses(PageRequest.of(page, size));
    }

    @GetMapping("/all")
    public List<CourseDetailsDto> getAllCourses(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size) {
        return courseService.getAllCourses(PageRequest.of(page, size));
    }

    @GetMapping("/lecture/tag/{tagId}")
    public List<CourseDetailsDto> getAllCoursesByLectureTag(@PathVariable UUID tagId) {
        return courseService.getAllCoursesByLectureTag(tagId);
    }

    @GetMapping("/author/user")
    public List<CourseDetailsDto> getAllCoursesByLectureTag(@CurrentUser UserPrincipal userPrincipal) {
        return courseService.getAllAuthorCourses(userPrincipal);
    }
}
