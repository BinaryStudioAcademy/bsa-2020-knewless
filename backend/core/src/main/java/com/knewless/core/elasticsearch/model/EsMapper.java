package com.knewless.core.elasticsearch.model;

import com.knewless.core.author.model.Author;
import com.knewless.core.course.courseReaction.model.CourseReaction;
import com.knewless.core.course.model.Course;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.model.Path;
import com.knewless.core.school.model.School;
import com.knewless.core.tag.model.Tag;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * On the frontend it's mapped here
 * frontend/src/screens/SearchResultsPage/models/EsModels.ts
 */
public class EsMapper {

    public static EsEntity esEntityFromAuthorEntity(Author entity) {
        if (entity == null) {
            return null;
        }
    
        Map<String, Object> metadata = new HashMap<>();
        // todo: add subscribers to author's meta
        
        return EsEntity.builder()
                .name(entity.getFullName())
                .sourceId(entity.getId())
                .type(EsDataType.AUTHOR)
                .metadata(metadata)
                .build();
    }

    public static EsEntity esEntityFromCourseEntity(Course course, List<String> tags) {
        if (course == null) {
            return null;
        }

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("image", course.getImage());
        metadata.put("author", course.getAuthor().getFullName());
        metadata.put("authorId", course.getAuthor().getId());
        metadata.put("date", course.getReleasedDate());
        metadata.put("level", course.getLevel().toString());
        metadata.put("total minutes", course.getLectures().stream().mapToInt(Lecture::getDuration).sum());
        metadata.put("rating", (int) Math.round(course.getReactions().stream().mapToInt(CourseReaction::getReaction).average().orElse(0)));

        return EsEntity.builder()
                .name(course.getName())
                .sourceId(course.getId())
                .type(EsDataType.COURSE)
                .tags(tags)
                .metadata(metadata)
                .build();
    }

    public static EsEntity esEntityFromPathEntity(Path path) {
        if (path == null) {
            return null;
        }

        Map<String, Object> metadata = new HashMap<>();
        var duration = path.getCourses().stream().mapToInt(
                c -> c.getLectures().stream().mapToInt(Lecture::getDuration).sum()
        ).sum();
        metadata.put("total minutes", duration);
        metadata.put("image", path.getImageTag().getSource());
        metadata.put("courses", path.getCourses().size());
        metadata.put("author", path.getAuthor().getFullName());

        return EsEntity.builder()
                .name(path.getName())
                .tags(path.getTags().stream().map(Tag::getName).collect(Collectors.toList()))
                .sourceId(path.getId())
                .type(EsDataType.PATH)
                .metadata(metadata)
                .build();
    }

    public static EsEntity esEntityFromSchoolEntity(School school, List<Author> authors) {
        if (school == null) {
            return null;
        }

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("authors number", authors.size());

        return EsEntity.builder()
                .name(school.getName())
                .type(EsDataType.SCHOOL)
                .sourceId(school.getId())
                .metadata(metadata)
                .build();
    }
}
