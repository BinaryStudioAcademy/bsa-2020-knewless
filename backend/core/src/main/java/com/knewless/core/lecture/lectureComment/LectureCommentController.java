package com.knewless.core.lecture.lectureComment;

import com.knewless.core.lecture.lectureComment.dto.LectureCommentDto;
import com.knewless.core.lecture.lectureComment.dto.SaveLectureCommentRequest;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
		return (LectureCommentDto) service.save(request, userPrincipal.getId());
	}
	
	@GetMapping("of/{lectureId}")
	public List<LectureCommentDto> getCommentsByCourse(@PathVariable("lectureId") UUID lectureId,
													   @RequestParam(defaultValue = "0") int page,
													   @RequestParam(defaultValue = "2") int size) {
		return service.getCommentsOf(lectureId, PageRequest.of(page, size)).stream()
				.map(LectureCommentMapper.MAPPER::commentToDto).collect(Collectors.toList());
	}
}
