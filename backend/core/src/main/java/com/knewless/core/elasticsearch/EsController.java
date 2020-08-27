package com.knewless.core.elasticsearch;

import com.knewless.core.elasticsearch.dto.EsSearchRequest;
import com.knewless.core.elasticsearch.dto.EsSearchResult;
import com.knewless.core.elasticsearch.model.EsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/es")
public class EsController {

    @Autowired
    private EsService service;

    @GetMapping("/get")
    public Iterable<EsEntity> get() {
        return service.findAll();
    }

    @GetMapping("/search")
    public List<EsEntity> search(@RequestParam String query) {
        return service.search(query);
    }

    @PostMapping("/search/advanced")
    public EsSearchResult advancedSearch(@Valid @RequestBody EsSearchRequest request) {
        return service.advancedSearch(request);
    }

    @GetMapping("/search/courses")
    public List<EsEntity> searchCourses(@RequestParam String query) {
        return service.searchCourses(query);
    }
}
