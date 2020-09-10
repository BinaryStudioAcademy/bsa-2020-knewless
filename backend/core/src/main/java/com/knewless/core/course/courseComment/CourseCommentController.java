package com.knewless.core.course.courseComment;

import com.knewless.core.course.courseComment.dto.CourseCommentDto;
import com.knewless.core.course.courseComment.dto.SaveCourseCommentRequest;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("course_comment")
public class CourseCommentController {
	private final CourseCommentService courseCommentService;
	
	@Autowired
	public CourseCommentController(CourseCommentService courseCommentService) {
		this.courseCommentService = courseCommentService;
	}
	
	@PostMapping
	public CourseCommentDto saveComment(@RequestBody SaveCourseCommentRequest request, @CurrentUser UserPrincipal userPrincipal) {
		return (CourseCommentDto) courseCommentService.save(request, userPrincipal.getId());
	}
	
	@GetMapping("of/{courseId}")
	public List<CourseCommentDto> getCommentsByCourse(@PathVariable("courseId") UUID courseId,
													  @RequestParam(defaultValue = "0") int page,
													  @RequestParam(defaultValue = "2") int size) {
		return courseCommentService.getCommentsOf(courseId, PageRequest.of(page, size)).stream()
				.map(CourseCommentMapper.MAPPER::commentToDto).collect(Collectors.toList());
	}
}
