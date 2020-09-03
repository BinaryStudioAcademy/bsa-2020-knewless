package com.knewless.core.path;

import com.knewless.core.db.SourceType;
import com.knewless.core.path.dto.AuthorPathQueryResult;
import com.knewless.core.path.dto.PathQueryResult;
import com.knewless.core.path.model.Path;
import com.knewless.core.tag.model.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface PathRepository extends JpaRepository<Path, UUID> {

    @Query("SELECT new com.knewless.core.path.dto.PathQueryResult(p.id, p.name, " +
            "p.imageTag.source, SIZE(p.courses), " +
            "(SELECT COALESCE(SUM(pcl.duration), 0) FROM p.courses as pc " +
            "INNER JOIN pc.lectures as pcl)) " +
            "FROM Path p")
    List<PathQueryResult> getAllPaths(Pageable pageable);

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Query("SELECT DISTINCT new com.knewless.core.path.dto.AuthorPathQueryResult(p.id, p.name, " +
            "p.imageTag.source, SIZE(p.courses), " +
            "(SELECT COALESCE(SUM(pcl.duration), 0) " +
            "FROM p.courses as pc INNER JOIN pc.lectures as pcl), p.updatedAt) " +
            "FROM Path p " +
            "WHERE p.author.id = :authorId " +
            "ORDER BY p.updatedAt DESC")
    List<AuthorPathQueryResult> getLatestPathsByAuthorId(@Param("authorId") UUID authorId);

    @Query("SELECT new com.knewless.core.path.dto.PathQueryResult(p.id, p.name, " +
            "p.imageTag.source, SIZE(p.courses), " +
            "(SELECT COALESCE(SUM(pcl.duration), 0) FROM p.courses as pc " +
            "INNER JOIN pc.lectures as pcl)) " +
            "FROM Path p " +
            "WHERE p.author.id = :authorId " +
            "ORDER BY p.updatedAt DESC")
    List<PathQueryResult> getAllPathsByAuthorId(UUID authorId);

    @Query("SELECT new com.knewless.core.path.dto.PathQueryResult(p.id, p.name, " +
            "p.imageTag.source, SIZE(p.courses), " +
            "(SELECT COALESCE(SUM(pcl.duration), 0) FROM p.courses as pc " +
            "INNER JOIN pc.lectures as pcl)) " +
            "FROM Path p " +
            "LEFT JOIN p.tags as t " +
            "WHERE t.id = :tagId " +
            "ORDER BY p.updatedAt DESC")
    List<PathQueryResult> getPathsByTagId(UUID tagId);

    @Query("SELECT new com.knewless.core.path.dto.PathQueryResult(p.id, p.name, " +
            "p.imageTag.source, SIZE(p.courses), " +
            "(SELECT COALESCE(SUM(pcl.duration), 0) FROM p.courses as pc " +
            "INNER JOIN pc.lectures as pcl)) " +
            "FROM Path p " +
            "LEFT JOIN p.tags as t " +
            "WHERE t.id IN :tagId " +
            "ORDER BY p.updatedAt DESC")
    List<PathQueryResult> getPathsByTagIds(List<UUID> tagId);

    @Query("SELECT DISTINCT new com.knewless.core.path.dto.PathQueryResult(p.id, p.name, " +
            "p.imageTag.source, SIZE(p.courses), " +
            "(SELECT COALESCE(SUM(pcl.duration), 0) FROM p.courses as pc " +
            "INNER JOIN pc.lectures as pcl)) " +
            "FROM CurrentUserCourse cuc " +
            "LEFT JOIN cuc.course as c " +
            "LEFT JOIN c.paths as p " +
            "WHERE cuc.user.id = :userId")
    List<PathQueryResult> getPathsByUserId(UUID userId);

    @Query("SELECT p FROM Path p " +
            "INNER JOIN Favorite f ON f.sourceId = p.id " +
            "WHERE f.sourceType = :type AND f.user.id = :userId")
    List<Path> getFavouritePathsByUserId(@Param("userId") UUID userId, @Param("type") SourceType type);

    List<Path> findTop10ByAuthorIsNotNull();

    List<Path> findAllByAuthorId(UUID id);

    @Query("SELECT p.tags " +
            "FROM Path p " +
            "WHERE p.id = :id")
    List<Tag> getTagsByPathId(@Param("id") UUID id);

    @Query("SELECT new com.knewless.core.path.dto.PathQueryResult(p.id, p.name, " +
            "p.imageTag.source, SIZE(p.courses), " +
            "(SELECT COALESCE(SUM(pcl.duration), 0) FROM p.courses as pc " +
            "INNER JOIN pc.lectures as pcl)) " +
            "FROM Path p " +
            "WHERE p.id NOT IN :id")
    List<PathQueryResult> getAdditionalPaths(@Param("id") List<UUID> id, Pageable pageable);
}
