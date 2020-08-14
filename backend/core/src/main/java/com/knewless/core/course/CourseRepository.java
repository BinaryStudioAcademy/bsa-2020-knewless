package com.knewless.core.course;

import com.knewless.core.course.dto.AuthorCourseQueryResult;
import com.knewless.core.course.dto.CourseIdByLectureIdProjection;
import com.knewless.core.course.dto.CourseQueryResult;
import com.knewless.core.course.dto.CourseToPlayerProjection;
import com.knewless.core.course.model.Course;
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
            "c.category.name, c.image, " +
            "(SELECT COALESCE(SUM(cl.duration), 0) FROM c.lectures as cl), " +
            "(SELECT COALESCE(SUM(CASE WHEN cr.reaction = TRUE THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr WHERE cr.reaction = TRUE), " +
            "SIZE(c.reactions)) " +
            "FROM Course c ";

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
            "( " +
            "SELECT COALESCE(SUM(CASE WHEN cr.reaction = TRUE THEN 1 ELSE 0 END), 0) " +
            "FROM c.reactions as cr " +
            "WHERE cr.reaction = TRUE" +
            "), " +
            "SIZE(c.reactions), c.updatedAt) " +
            "FROM Course c WHERE c.author.id = :authorId " +
            "ORDER BY c.updatedAt")
    List<AuthorCourseQueryResult> getCoursesByAuthorId(@Param("authorId") UUID authorId);
}
