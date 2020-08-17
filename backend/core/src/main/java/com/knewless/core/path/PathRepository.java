package com.knewless.core.path;

import com.knewless.core.path.dto.AuthorPathQueryResult;
import com.knewless.core.path.dto.PathQueryResult;
import com.knewless.core.path.model.Path;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PathRepository extends JpaRepository<Path, UUID> {

    @Query("SELECT new com.knewless.core.path.dto.PathQueryResult(p.id, p.name, " +
            "p.imageTag.source, SIZE(p.courses), " +
            "(SELECT COALESCE(SUM(pcl.duration), 0) FROM p.courses as pc " +
            "INNER JOIN pc.lectures as pcl)) " +
            "FROM Path p")
    List<PathQueryResult> getAllPaths(Pageable pageable);

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Query("SELECT DISTINCT new com.knewless.core.path.dto.AuthorPathQueryResult(p.name, " +
            "p.imageTag.source, SIZE(p.courses), " +
            "(SELECT COALESCE(SUM(pcl.duration), 0) " +
            "FROM p.courses as pc INNER JOIN pc.lectures as pcl), p.updatedAt) " +
            "FROM Path p " +
            "WHERE p.author.id = :authorId " +
            "ORDER BY p.updatedAt DESC")
    List<AuthorPathQueryResult> getLatestPathsByAuthorId(@Param("authorId") UUID authorId);

}
