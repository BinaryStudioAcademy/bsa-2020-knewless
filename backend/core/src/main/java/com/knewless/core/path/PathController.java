package com.knewless.core.path;

import com.knewless.core.path.dto.AuthorPathDto;
import com.knewless.core.path.dto.PathDto;
import org.springframework.beans.factory.annotation.Autowired;
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
    private List<PathDto> getAllPaths() {
        return pathService.getAllPaths();
    }

    @GetMapping("/author/{authorId}")
    private ResponseEntity<List<AuthorPathDto>> getAuthorPaths(@PathVariable UUID authorId) {
        return ResponseEntity.ok(pathService.getPathsByAuthorId(authorId));
    }

}
