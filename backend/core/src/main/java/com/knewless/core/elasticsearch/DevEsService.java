package com.knewless.core.elasticsearch;

import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.CourseRepository;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.elasticsearch.model.EsDataType;
import com.knewless.core.elasticsearch.model.EsEntity;
import com.knewless.core.path.PathRepository;
import com.knewless.core.path.model.Path;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Profile("DEV")
public class DevEsService {
	private final EsService esService;
	private final PathRepository pathService;
	private final CourseRepository courseService;
	private final AuthorRepository authorService;
	
	@Autowired
	public DevEsService(EsService esService, PathRepository pathService, CourseRepository courseService, AuthorRepository authorService) {
		this.esService = esService;
		this.pathService = pathService;
		this.courseService = courseService;
		this.authorService = authorService;
	}
	
	public void syncWithStorage() {
		List<Course> courses = courseService.findAll();
		List<Author> authors = authorService.findAll();
		List<Path> paths = pathService.findAll();
		List<EsEntity> entities = esService.findAll();
		List<EsEntity> esCourses = entities.stream().filter(e -> e.getType().equals(EsDataType.COURSE)).collect(Collectors.toList());
		List<EsEntity> esPaths = entities.stream().filter(e -> e.getType().equals(EsDataType.PATH)).collect(Collectors.toList());
		List<EsEntity> esAuthors = entities.stream().filter(e -> e.getType().equals(EsDataType.AUTHOR)).collect(Collectors.toList());
		sync(courses, esCourses, EsDataType.COURSE);
		sync(authors, esAuthors, EsDataType.AUTHOR);
		sync(paths, esPaths, EsDataType.PATH);
	}
	
	private void sync(List<? extends BaseEntity> dbEntities, List<EsEntity> esEntities, EsDataType dataType) {
		log.info("Syncing " + dataType);
		for (BaseEntity dbEntity : dbEntities) {
			log.info("Entity id {}", dbEntity.getId());
			boolean savedBefore = false;
			for (EsEntity esEntity : esEntities) {
				if (dbEntity.getId().equals(esEntity.getSourceId())) {
					savedBefore = true;
					if (!dbEntity.getUpdatedAt().toString().equals(esEntity.getUpdatedAt())) {
						log.info("Outdated (old updatedAt {}, new updatedAt {}), updating", esEntity.getUpdatedAt(), dbEntity.getUpdatedAt().toString());
						esService.update(dataType, dbEntity);
					} else {
						log.info("Up to date");
					}
				}
			}
			if (!savedBefore) {
				log.info("New entity");
				esService.put(dataType, dbEntity);
			}
		}
	}
}
