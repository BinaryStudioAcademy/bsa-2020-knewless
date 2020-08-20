package com.knewless.core.elasticsearch.model;

import com.knewless.core.author.model.Author;
import com.knewless.core.course.model.Course;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.model.Path;
import com.knewless.core.school.model.School;
import com.knewless.core.tag.model.Tag;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class EsMapper {

    public static EsEntity esEntityFromAuthorEntity(Author entity) {
        if (entity == null) {
            return null;
        }
        return EsEntity.builder()
                .name(entity.getFirstName() + " " + entity.getLastName())
                .sourceId(entity.getId())
                .type(EsDataType.AUTHOR)
                .build();
    }

    public static EsEntity esEntityFromCourseEntity(Course course) {
        if (course == null) {
            return null;
        }

        // TODO add rating
        Map<String, Object> metadata = new HashMap<>();
        String fullName = course.getAuthor().getFirstName() + " " + course.getAuthor().getLastName();
        metadata.put("author", fullName);
        metadata.put("date", course.getReleasedDate());
        metadata.put("level", course.getLevel().toString());
        metadata.put("total minutes", course.getLectures().stream().mapToInt(Lecture::getDuration).sum());
//        metadata.put("rating", course.getReactions().stream());

        return EsEntity.builder()
                .name(course.getName())
                .sourceId(course.getId())
                .type(EsDataType.COURSE)
                .tags(course.getLectures().stream()
                        .map(Lecture::getTags)
                        .flatMap(Collection::stream)
                        .map(Tag::getName)
                        .distinct()
                        .collect(Collectors.toList())
                )
                .metadata(metadata)
                .build();
    }

    public static EsEntity esEntityFromPathEntity(Path path, List<Lecture> tags) {
        if (path == null) {
            return null;
        }

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("total minutes", tags.stream().mapToInt(Lecture::getDuration).sum());

        return EsEntity.builder()
                .name(path.getName())
                .tags(tags.stream()
                        .map(Lecture::getTags)
                        .flatMap(Collection::stream)
                        .map(Tag::getName)
                        .collect(Collectors.toList())
                )
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
