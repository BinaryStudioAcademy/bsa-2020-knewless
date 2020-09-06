package com.knewless.core.course.courseComment;

import com.knewless.core.course.courseComment.dto.CourseCommentDto;
import com.knewless.core.course.courseComment.dto.SaveCourseCommentRequest;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
		return courseCommentService.save(request, userPrincipal.getId());
	}
}
