package com.knewless.core.course;

import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.SourceType;
import com.knewless.core.tag.model.Tag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {

    //language=SpringDataQL
    String COURSE_SELECT = "SELECT new com.knewless.core.course.dto.CourseQueryResult(c.id, " +
            "c.name, c.level, concat(c.author.firstName,' ' , c.author.lastName), c.author.id, c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "(SELECT COALESCE(SUM(cr.reaction), 0) " +
            "FROM c.reactions as cr), " +
            "SIZE(c.reactions)" +
            ") " +
            "FROM Course c ";

    CourseToPlayerProjection findOneById(UUID courseId);

    @Query(value = "select cast(course_id as varchar) from lectures where id = :lectureId",
            nativeQuery = true)
    CourseIdByLectureIdProjection findByLectureId(@Param("lectureId") UUID lectureId);

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Query(COURSE_SELECT + "WHERE c.id = :id AND c.releasedDate IS NOT NULL")
    Optional<CourseQueryResult> getCourseById(@Param("id") UUID id);

    @Query(COURSE_SELECT + "WHERE c.id = :id")
    Optional<CourseQueryResult> getCourseByIdToEdit(@Param("id") UUID id);

    @Query("SELECT DISTINCT new com.knewless.core.course.dto.CourseQueryResult(c.id, " +
            "c.name, c.level, concat(c.author.firstName,' ' , c.author.lastName), " +
            "c.author.id, c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "(SELECT COALESCE(SUM(cr.reaction), 0) " +
            "FROM c.reactions as cr), " +
            "SIZE(c.reactions)) " +
            "FROM Course c left join c.lectures l left join l.tags t " +
            "WHERE (c.id NOT IN :id AND t.id IN :tags) AND c.releasedDate IS NOT NULL")
    List<CourseQueryResult> getRecommendedCourses(@Param("id") List<UUID> id, @Param("tags") List<UUID> tags);

    @Query(COURSE_SELECT + "WHERE (c.id NOT IN :id) AND c.releasedDate IS NOT NULL")
    List<CourseQueryResult> getAdditionalCourses(@Param("id") List<UUID> id, Pageable pageable);

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Query(COURSE_SELECT + "WHERE c.author.id = :authorId AND c.releasedDate IS NOT NULL")
    List<CourseQueryResult> findAllByAuthor(UUID authorId);

    @Query(COURSE_SELECT + "WHERE c.releasedDate IS NOT NULL")
    List<CourseQueryResult> getCourses(Pageable pageable);

    @Query("SELECT new com.knewless.core.course.dto.CourseQueryResult(c.id, c.name, c.level, " +
            "concat(c.author.firstName,' ' , c.author.lastName), c.author.id, c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "(SELECT COALESCE(SUM(cr.reaction), 0) FROM c.reactions as cr), " +
            "SIZE(c.reactions)" +
            ") " +
            "FROM Course c " +
            "WHERE c.id = :id AND c.releasedDate IS NOT NULL")
    Optional<CourseQueryResult> findCourseById(UUID id);

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Query("SELECT DISTINCT new com.knewless.core.course.dto.AuthorCourseQueryResult(c.id, c.name, c.level, " +
            "concat(c.author.firstName,' ' , c.author.lastName), c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "(SELECT COALESCE(SUM(cr.reaction), 0) FROM c.reactions as cr), " +
            "SIZE(c.reactions), c.updatedAt, SIZE(c.lectures), c.description " +
            ") " +
            "FROM Course as c " +
            "WHERE c.author.id = :authorId AND c.releasedDate IS NOT NULL " +
            "ORDER BY c.updatedAt DESC")
    List<AuthorCourseQueryResult> getLatestCoursesByAuthorId(@Param("authorId") UUID authorId);

    @Query("SELECT new com.knewless.core.course.dto.CourseDetailsQueryResult(" +
            "c.id, c.name, c.level, c.author.id, concat(c.author.firstName,' ' , c.author.lastName), c.image, " +
            "c.releasedDate, (SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "c.description, " +
            "(SELECT COALESCE(SUM(cr.reaction), 0) FROM c.reactions as cr), " +
            "SIZE(c.reactions), size(c.lectures)" +
            ") " +
            "FROM CurrentUserCourse cc " +
            "LEFT JOIN cc.course as c " +
            "WHERE cc.user.id = :id AND c.releasedDate IS NOT NULL")
    List<CourseDetailsQueryResult> getDetailCoursesByUserId(@Param("id") UUID id);

    @Query("SELECT new com.knewless.core.course.dto.CourseDetailsQueryResult(" +
            "c.id, c.name, c.level, c.author.id, concat(c.author.firstName,' ' , c.author.lastName), c.image, " +
            "c.releasedDate, (SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "c.description, " +
            "(SELECT COALESCE(SUM(cr.reaction), 0) FROM c.reactions as cr), " +
            "SIZE(c.reactions), SIZE(c.lectures)" +
            ") " +
            "FROM Course c " +
            "WHERE c.releasedDate IS NOT NULL " +
            "ORDER BY c.updatedAt DESC")
    List<CourseDetailsQueryResult> getAllDetailCourses();

    @Query("SELECT new com.knewless.core.course.dto.CourseDetailsQueryResult(" +
            "c.id, c.name, c.level, c.author.id, concat(c.author.firstName,' ' , c.author.lastName), c.image, " +
            "c.releasedDate, (SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "c.description, " +
            "(SELECT COALESCE(SUM(cr.reaction), 0) FROM c.reactions as cr), " +
            "SIZE(c.reactions), SIZE(c.lectures)" +
            ") " +
            "FROM Course c " +
            "LEFT JOIN c.lectures as l " +
            "LEFT JOIN l.tags as t " +
            "WHERE t.id = :tagId AND c.releasedDate IS NOT NULL " +
            "ORDER BY c.updatedAt DESC")
    List<CourseDetailsQueryResult> getDetailCoursesByLectureTag(UUID tagId);


    // all courses with drafts
    @Query("SELECT new com.knewless.core.course.dto.CourseDetailsQueryResult(" +
            "c.id, c.name, c.level, c.author.id, concat(c.author.firstName,' ' , c.author.lastName), c.image, " +
            "c.releasedDate, (SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "c.description, " +
            "(SELECT COALESCE(SUM(cr.reaction), 0) FROM c.reactions as cr), " +
            "SIZE(c.reactions), SIZE(c.lectures)" +
            ") " +
            "FROM Course c " +
            "WHERE c.author.id = :authorId " +
            "ORDER BY c.updatedAt DESC")
    List<CourseDetailsQueryResult> getDetailCoursesByAuthorId(UUID authorId);

    @Query("SELECT new com.knewless.core.course.dto.CourseDetailsQueryResult(" +
            "c.id, c.name, c.level, c.author.id, concat(c.author.firstName,' ' , c.author.lastName), c.image, " +
            "c.releasedDate, (SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "c.description, " +
            "( " +
            "SELECT COALESCE(SUM(CASE WHEN cr.reaction = 1 THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr " +
            "WHERE cr.reaction = 1" +
            "), " +
            "SIZE(c.reactions), " +
            "SIZE(c.lectures)" +
            ") " +
            "FROM Course c " +
            "WHERE c.id = :courseId AND c.releasedDate IS NOT NULL")
    Optional<CourseDetailsQueryResult> getDetailCourseById(UUID courseId);

    @Query("SELECT c FROM Course c " +
            "INNER JOIN Favorite f ON f.sourceId = c.id " +
            "WHERE f.sourceType = :type AND f.user.id = :userId")
    List<Course> getFavouriteCoursesByUserId(@Param("userId") UUID userId, @Param("type") SourceType type);

    List<Course> findAllByAuthorId(UUID id);

    @Query("SELECT c.id " +
            "FROM Course c JOIN c.reactions cr " +
            "GROUP BY c.id " +
            "ORDER BY (SUM(cr.reaction) / SIZE(c.reactions)) DESC, SIZE(c.reactions) DESC ")
    List<UUID> getPopularCourses(Pageable pageable);

    int countByAuthorId(UUID id);
}
