package com.knewless.core.elasticsearch.model;

import com.knewless.core.author.model.Author;
import com.knewless.core.course.courseReaction.model.CourseReaction;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.model.Path;
import com.knewless.core.school.model.School;
import com.knewless.core.tag.model.Tag;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * On the frontend it's mapped here
 * frontend/src/screens/SearchResultsPage/models/EsModels.ts
 */
public class EsMapper {
	
	public static EsEntity esEntityFromAuthorEntity(Author author, Integer subs) {
		if (author == null) {
			return null;
		}
		
		Map<String, Object> metadata = new HashMap<>();
		metadata.put("avatar", author.getAvatar());
        metadata.put("biography", author.getBiography());
        metadata.put("company", author.getCompany());
        metadata.put("job", author.getJob());
        metadata.put("subscribers", subs);
		
		return builderFromBaseEntity(author)
				.name(author.getFullName())
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
		metadata.put("total minutes", course.getLectures().stream().mapToInt(Lecture::getDuration).sum());metadata.put("lectures", course.getLectures().size());
		metadata.put("rating", (int) Math.round(course.getReactions().stream().mapToInt(CourseReaction::getReaction).average().orElse(0)));
		metadata.put("ratingCount", 0);
		
		return builderFromBaseEntity(course)
				.name(course.getName())
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
		
		return builderFromBaseEntity(path)
				.name(path.getName())
				.tags(path.getTags().stream().map(Tag::getName).collect(Collectors.toList()))
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
		
		return builderFromBaseEntity(school)
				.name(school.getName())
				.type(EsDataType.SCHOOL)
				.metadata(metadata)
				.build();
	}
	
	private static EsEntity.EsEntityBuilder builderFromBaseEntity(BaseEntity entity) {
		Date updatedAt = entity.getUpdatedAt() == null ? new Date() : entity.getUpdatedAt();
		return EsEntity.builder()
				.updatedAt(updatedAt.toString())
				.type(EsDataType.SCHOOL)
				.sourceId(entity.getId());
	}
}
