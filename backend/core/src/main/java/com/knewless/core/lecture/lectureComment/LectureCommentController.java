package com.knewless.core.lecture.lectureComment;

import com.knewless.core.lecture.lectureComment.dto.LectureCommentDto;
import com.knewless.core.lecture.lectureComment.dto.SaveLectureCommentRequest;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("lecture_comment")
public class LectureCommentController {
	private final LectureCommentService service;
	
	@Autowired
	public LectureCommentController(LectureCommentService service) {
		this.service = service;
	}
	
	@PostMapping
	public LectureCommentDto saveComment(@RequestBody SaveLectureCommentRequest request, @CurrentUser UserPrincipal userPrincipal) {
		return service.save(request, userPrincipal.getId());
	}
}
