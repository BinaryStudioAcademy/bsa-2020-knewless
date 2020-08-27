package com.knewless.core.elasticsearch;

import com.knewless.core.author.model.Author;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.elasticsearch.dto.*;
import com.knewless.core.elasticsearch.model.EsDataType;
import com.knewless.core.elasticsearch.model.EsEntity;
import com.knewless.core.elasticsearch.model.EsMapper;
import com.knewless.core.path.model.Path;
import com.knewless.core.tag.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.elasticsearch.index.query.QueryBuilders.matchQuery;
import static org.elasticsearch.index.query.QueryBuilders.rangeQuery;

@Service
@Slf4j
public class EsService {

    @Autowired
    private EsRepository esRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private ElasticsearchOperations elasticsearchTemplate;

    public void put(EsDataType dataType, BaseEntity data) {

        EsEntity entity = convertToEsEntity(dataType, data);

	log.info("Saving to ES {}: {}", dataType, data.getId());
        esRepository.save(entity);
    }

    public void update(EsDataType dataType, BaseEntity data) {

        EsEntity entity = convertToEsEntity(dataType, data);

        EsEntity esEntityFromEs = esRepository.findBySourceId(data.getId()).orElseThrow();
        entity.setId(esEntityFromEs.getId());

	log.info("Updating for ES {}: {}", dataType, data.getId());
        esRepository.save(entity);
    }

    private EsEntity convertToEsEntity(EsDataType dataType, BaseEntity data) {
        EsEntity entity = new EsEntity();

        switch (dataType) {
            case PATH: {
                entity = EsMapper.esEntityFromPathEntity((Path) data);
                break;
            }

            case AUTHOR: {
                entity = EsMapper.esEntityFromAuthorEntity((Author) data);
                break;
            }

            case COURSE: {
                Course course = (Course) data;
                List<String> tags = tagRepository.getTagsByCourse(course.getId());
                entity = EsMapper.esEntityFromCourseEntity(course, tags);
                break;
            }

            case SCHOOL: {
                break;
            }
        }
        return entity;
    }

    public List<EsEntity> search(String query) {
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withQuery(matchQuery("name", query))
                .build();

        SearchHits<EsEntity> entities = elasticsearchTemplate.search(searchQuery, EsEntity.class);

        List<EsEntity> result = entities.getSearchHits().stream().map(SearchHit::getContent).collect(Collectors.toList());
        return result.size() > 10 ? result.subList(0 , 10) : result;
    }

    public List<EsEntity> searchCourses(String query) {
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withQuery(matchQuery("type", "course"))
                .withQuery(matchQuery("name", query))
                .build();

        SearchHits<EsEntity> entities = elasticsearchTemplate.search(searchQuery, EsEntity.class);
        return entities.getSearchHits().stream().map(SearchHit::getContent).collect(Collectors.toList());
    }

    public List<EsEntity> findAll() {
        var response = new ArrayList<EsEntity>();
        esRepository.findAll().forEach(response::add);
        return response;
    }

    // TODO replace call of this method with "update" one from this service
    public void updateCourseRating(UUID courseId, int rating) {
        EsEntity entity = esRepository.findBySourceId(courseId).orElse(null);
        if (entity == null) {
            return;
        }

        ((Map<String, Object>) entity.getMetadata()).put("rating", rating);
        esRepository.save(entity);
    }
    
    public EsSearchResult advancedSearch(EsSearchRequest request) {
        var filterQueryBuilder = new BoolQueryBuilder();
        String queryString = request.getQuery().trim();
        if (!queryString.equals("")) {
            filterQueryBuilder = filterQueryBuilder.must(matchQuery("name", queryString));
        }
        for (MatchFilter filter : request.getMatchFilters()) {
            filterQueryBuilder = filterQueryBuilder.must(matchQuery(filter.getField(), filter.getValue()));
        }
        for (RangeFilter filter : request.getRangeFilters()) {
            var rangeQueryBuilder = rangeQuery(filter.getField());
            for (RangeBoundary boundary : filter.getRangeBoundaries()) {
                rangeQueryBuilder = boundary.getType().appendToBuilder(rangeQueryBuilder, boundary.getValue());
            }
            filterQueryBuilder = filterQueryBuilder.filter(rangeQueryBuilder);
        }
        var nativeQueryBuilder = new NativeSearchQueryBuilder().withQuery(filterQueryBuilder);
        for (Sorting sorting : request.getSorting()) {
            nativeQueryBuilder = nativeQueryBuilder.withSort(SortBuilders.fieldSort(sorting.getField()).order(sorting.getOrder()));
        }
        var searchQuery = nativeQueryBuilder.withPageable(PageRequest.of(request.getPage(), request.getSize())).build();
        var searchHits = elasticsearchTemplate.search(searchQuery, EsEntity.class);
        var response = new EsSearchResult();
        response.setTotal(searchHits.getTotalHits());
        response.setResults(searchHits.stream().map(SearchHit::getContent).collect(Collectors.toList()));
        return response;
    }
}
