package com.knewless.core.course;

import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {

    //language=SpringDataQL
    String COURSE_SELECT = "SELECT new com.knewless.core.course.dto.CourseQueryResult(c.id, " +
            "c.name, c.level, concat(c.author.firstName,' ' , c.author.lastName), " +
            "category.name, c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "(SELECT COALESCE(SUM(CASE WHEN cr.reaction = TRUE THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr WHERE cr.reaction = TRUE), " +
            "SIZE(c.reactions)) " +
            "FROM Course c " +
            "LEFT JOIN c.category category ";

    CourseToPlayerProjection findOneById(UUID courseId);

    @Query(value = "select cast(course_id as varchar) from lectures where id = :lectureId",
            nativeQuery = true)
    CourseIdByLectureIdProjection findByLectureId(@Param("lectureId") UUID lectureId);

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Query(COURSE_SELECT + "WHERE c.id = :id")
    CourseQueryResult getCourseById(@Param("id") UUID id);

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Query(COURSE_SELECT + "where c.author.id = :authorId")
    List<CourseQueryResult> findAllByAuthor(UUID authorId);

    @Query(COURSE_SELECT)
    List<CourseQueryResult> getCourses(Pageable pageable);

    @SuppressWarnings("SpringDataRepositoryMethodReturnTypeInspection")
    @Query("SELECT DISTINCT new com.knewless.core.course.dto.AuthorCourseQueryResult(c.id, " +
            "c.name, c.level, concat(c.author.firstName,' ' , c.author.lastName), c.category.name, c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "(SELECT COALESCE(SUM(CASE WHEN cr.reaction = TRUE THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr WHERE cr.reaction = TRUE), " +
            "SIZE(c.reactions), c.updatedAt) " +
            "FROM Course as c LEFT JOIN c.category category " +
            "WHERE c.author.id = :authorId " +
            "ORDER BY c.updatedAt DESC")
    List<AuthorCourseQueryResult> getLatestCoursesByAuthorId(@Param("authorId") UUID authorId);

    @Query("SELECT new com.knewless.core.course.dto.CourseDetailsQueryResult(" +
            "c.id, c.name, c.level, " +
            "c.author.id, concat(c.author.firstName,' ' , c.author.lastName), " +
            "c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "c.description, " +
            "( " +
            "SELECT COALESCE(SUM(CASE WHEN cr.reaction = TRUE THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr " +
            "WHERE cr.reaction = TRUE" +
            "), " +
            "SIZE(c.reactions), " +
            "size(c.lectures)) " +
            "FROM CurrentUserCourse cc " +
            "LEFT JOIN cc.course as c " +
            "WHERE cc.user.id = :id")
    List<CourseDetailsQueryResult> getDetailCoursesByUserId(@Param("id") UUID id);

    @Query("SELECT new com.knewless.core.course.dto.CourseDetailsQueryResult(" +
            "c.id, c.name, c.level, " +
            "c.author.id, concat(c.author.firstName,' ' , c.author.lastName), " +
            "c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "c.description, " +
            "( " +
            "SELECT COALESCE(SUM(CASE WHEN cr.reaction = TRUE THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr " +
            "WHERE cr.reaction = TRUE" +
            "), " +
            "SIZE(c.reactions), " +
            "SIZE(c.lectures)) " +
            "FROM Course c " +
            "ORDER BY c.updatedAt DESC")
    List<CourseDetailsQueryResult> getDetailCourses(Pageable pageable);

    @Query("SELECT new com.knewless.core.course.dto.CourseDetailsQueryResult(" +
            "c.id, c.name, c.level, " +
            "c.author.id, concat(c.author.firstName,' ' , c.author.lastName), " +
            "c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "c.description, " +
            "( " +
            "SELECT COALESCE(SUM(CASE WHEN cr.reaction = TRUE THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr " +
            "WHERE cr.reaction = TRUE" +
            "), " +
            "SIZE(c.reactions), " +
            "SIZE(c.lectures)) " +
            "FROM Course c " +
            "LEFT JOIN c.lectures as l " +
            "LEFT JOIN l.tags as t " +
            "WHERE t.id = :tagId " +
            "ORDER BY c.updatedAt DESC")
    List<CourseDetailsQueryResult> getDetailCoursesByLectureTag(UUID tagId);

    @Query("SELECT new com.knewless.core.course.dto.CourseDetailsQueryResult(" +
            "c.id, c.name, c.level, " +
            "c.author.id, concat(c.author.firstName,' ' , c.author.lastName), " +
            "c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "c.description, " +
            "( " +
            "SELECT COALESCE(SUM(CASE WHEN cr.reaction = TRUE THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr " +
            "WHERE cr.reaction = TRUE" +
            "), " +
            "SIZE(c.reactions), " +
            "SIZE(c.lectures)) " +
            "FROM Course c " +
            "WHERE c.author.id = :authorId " +
            "ORDER BY c.updatedAt DESC")
    List<CourseDetailsQueryResult> getDetailCoursesByAuthorId(UUID authorId);
}
