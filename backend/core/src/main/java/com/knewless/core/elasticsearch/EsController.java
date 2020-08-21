package com.knewless.core.elasticsearch;

import com.knewless.core.elasticsearch.model.EsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<?> search(@RequestParam String query) {
        return ResponseEntity.ok(service.search(query));
    }

    @GetMapping("/search/courses")
    public ResponseEntity<?> searchCourses(@RequestParam String query) {
        return ResponseEntity.ok(service.searchCourses(query));
    }
}
