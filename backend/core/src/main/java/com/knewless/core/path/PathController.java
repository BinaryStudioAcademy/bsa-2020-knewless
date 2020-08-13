package com.knewless.core.path;

import com.knewless.core.path.dto.AuthorPathDto;
import com.knewless.core.path.dto.PathCreationRequestDto;
import com.knewless.core.path.dto.PathDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/paths")
public class PathController {

    private final PathService pathService;

    @Autowired
    public PathController(PathService pathService) {
        this.pathService = pathService;
    }

    @GetMapping
    private List<PathDto> getPaths(@RequestParam(defaultValue = "10") int size,
									  @RequestParam(defaultValue = "0") int page) {
        return pathService.getPaths(PageRequest.of(page, size));
    }

    @GetMapping("/author/{authorId}")
    private ResponseEntity<List<AuthorPathDto>> getAuthorPaths(@PathVariable UUID authorId) {
        return ResponseEntity.ok(pathService.getPathsByAuthorId(authorId));
    }

	//	todo: add validators
	@PutMapping("create")
	public UUID create(@RequestBody PathCreationRequestDto requestDto, @CurrentUser UserPrincipal userPrincipal) {
		return pathService.create(userPrincipal.getId(), requestDto);
	}
}
