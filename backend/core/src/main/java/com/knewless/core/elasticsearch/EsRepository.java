package com.knewless.core.elasticsearch;

import com.knewless.core.elasticsearch.model.EsEntity;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EsRepository extends ElasticsearchRepository<EsEntity, UUID> {

    Optional<EsEntity> findByName(String name);

    Optional<EsEntity> findBySourceId(UUID sourceId);

    List<EsEntity> findByNameContainsIgnoreCase(String query);

    boolean existsBySourceId(UUID id);
    
    long deleteAllBy();
}
