package com.knewless.core.elasticsearch;

import com.knewless.core.author.model.Author;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.elasticsearch.model.EsDataType;
import com.knewless.core.elasticsearch.model.EsEntity;
import com.knewless.core.elasticsearch.model.EsMapper;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.model.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.elasticsearch.index.query.QueryBuilders.matchQuery;
import static org.elasticsearch.index.query.QueryBuilders.multiMatchQuery;

@Service
public class EsService {

    @Autowired
    private EsRepository esRepository;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private ElasticsearchOperations elasticsearchTemplate;

    public void put(EsDataType dataType, BaseEntity data) {

        EsEntity entity = new EsEntity();

        switch (dataType) {
            case PATH: {
                List<Lecture> lectures = lectureRepository.getLecturesByPathId(data.getId());
                entity = EsMapper.esEntityFromPathEntity((Path) data, lectures);
                break;
            }

            case AUTHOR: {
                entity = EsMapper.esEntityFromAuthorEntity((Author) data);
                break;
            }

            case COURSE: {
                entity = EsMapper.esEntityFromCourseEntity((Course) data);
                break;
            }

            case SCHOOL: {
//                entity = EsMapper.esEntityFromSchoolEntity((School) data, authorRepository.findBySchoolId(((BaseEntity) data).getId()));
                break;
            }
        }

        esRepository.save(entity);
    }

    public void update(EsDataType dataType, BaseEntity data) {

        EsEntity entity = new EsEntity();

        switch (dataType) {
            case PATH: {
                List<Lecture> lectures = lectureRepository.getLecturesByPathId(data.getId());
                entity = EsMapper.esEntityFromPathEntity((Path) data, lectures);
                break;
            }

            case AUTHOR: {
                entity = EsMapper.esEntityFromAuthorEntity((Author) data);
                break;
            }

            case COURSE: {
                entity = EsMapper.esEntityFromCourseEntity((Course) data);
                break;
            }

            case SCHOOL: {
//                entity = EsMapper.esEntityFromSchoolEntity((School) data, authorRepository.findBySchoolId(((BaseEntity) data).getId()));
                break;
            }
        }
        EsEntity esEntityFromEs = esRepository.findBySourceId(data.getId()).orElseThrow();
        entity.setId(esEntityFromEs.getId());

        esRepository.save(entity);
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
}
