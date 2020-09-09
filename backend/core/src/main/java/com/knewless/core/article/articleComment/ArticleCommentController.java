package com.knewless.core.article.articleComment;

import com.knewless.core.article.articleComment.dto.ArticleCommentDto;
import com.knewless.core.article.articleComment.dto.SaveArticleCommentRequest;
import com.knewless.core.course.courseComment.dto.CourseCommentDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("article_comment")
public class ArticleCommentController {
	private final ArticleCommentService articleCommentService;
	
	@Autowired
	public ArticleCommentController(ArticleCommentService articleCommentService) {
		this.articleCommentService = articleCommentService;
	}
	
	@PostMapping
	public ArticleCommentDto saveComment(@RequestBody SaveArticleCommentRequest request, @CurrentUser UserPrincipal userPrincipal) {
		return (ArticleCommentDto) articleCommentService.save(request, userPrincipal.getId());
	}
	
	@GetMapping("of/{articleId}")
	public List<ArticleCommentDto> getCommentsByArticle(@PathVariable("articleId") UUID articleId,
													   @RequestParam(defaultValue = "0") int page,
													   @RequestParam(defaultValue = "2") int size) {
		return articleCommentService.getCommentsOf(articleId, PageRequest.of(page, size)).stream()
				.map(ArticleCommentMapper.INSTANCE::commentToDto).collect(Collectors.toList());
	}
}
