package com.knewless.core.path;

import com.knewless.core.path.dto.PathDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@CrossOrigin
@RequestMapping("/paths")
public class PathController {

    @Autowired
    PathService pathService;

    @GetMapping
    private @ResponseBody List<PathDto> getAllPaths() {
        return pathService.getAllPaths();
    }
}
