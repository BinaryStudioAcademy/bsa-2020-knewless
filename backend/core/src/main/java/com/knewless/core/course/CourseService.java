package com.knewless.core.course;

import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import com.knewless.core.course.model.Level;
import com.knewless.core.lecture.Dto.ShortLectureDto;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.homework.HomeworkRepository;
import com.knewless.core.lecture.homework.model.Homework;
import com.knewless.core.lecture.model.Lecture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CourseService {

	private final CourseRepository courseRepository;
	private final LectureRepository lectureRepository;
	private final AuthorRepository authorRepository;
	private final HomeworkRepository homeworkRepository;

	@Autowired
	public CourseService(CourseRepository courseRepository, LectureRepository lectureRepository,
						 AuthorRepository authorRepository, HomeworkRepository homeworkRepository) {
		this.courseRepository = courseRepository;
		this.lectureRepository = lectureRepository;
		this.authorRepository = authorRepository;
		this.homeworkRepository = homeworkRepository;
	}

	public List<ShortLectureDto> getLecturesByUserId(UUID id) {
		List<Lecture> allLectures = lectureRepository.getLecturesByUserId(id);
		List<Lecture> result = new ArrayList<>();
		allLectures.forEach(lec -> {
			if (!result.stream().map(Lecture::getSourceUrl).collect(Collectors.toList()).contains(lec.getSourceUrl())) {
				result.add(lec);
			}
		});

		return result.stream()
				.map(l -> new ShortLectureDto(
						l.getId(),
						l.getName() == null ? "mockName" + (int) (Math.random() * 200) : l.getName(),
						l.getDescription(),
						l.getDuration()))
				.collect(Collectors.toList());
	}

	public CreateCourseResponseDto createCourse(CreateCourseRequestDto request) {
		System.out.println(request.getUserId());
		Author author = authorRepository.findByUserId(request.getUserId()).orElseThrow();
		List<Lecture> allLectures = lectureRepository.getLecturesByUserId(request.getUserId());
		allLectures.removeIf(l -> !request.getLectures().contains(l.getId()));
		List<Lecture> thisLectures = new ArrayList<>();
		List<Homework> homeworks = new ArrayList<>();
		Course course = Course.builder().level(Level.valueOf(request.getLevel())).author(author)
				.name(request.getName()).description(request.getDescription()).image(request.getImage()).build();
		for (Lecture l : allLectures) {
			Lecture lec = Lecture.builder().name(l.getName()).sourceUrl(l.getSourceUrl()).description(l.getDescription())
					.duration(l.getDuration()).build();
			if (l.getHomework() != null) {
				Homework homework = new Homework(l.getHomework().getDescription(), lec);
				homeworks.add(homework);
			}
			thisLectures.add(lec);
		}
		if (request.getIsReleased()) course.setReleasedDate(new Date());
		courseRepository.save(course);
		homeworkRepository.saveAll(homeworks);
		thisLectures.forEach(l -> {
			l.setCourse(course);
			Optional<Homework> ophw = homeworks.stream().filter(h -> h.getLecture().getId().equals(l.getId())).findFirst();
			ophw.ifPresent(l::setHomework);
		});
		lectureRepository.saveAll(thisLectures);
		return new CreateCourseResponseDto(course.getId(), true);
	}

	public CourseToPlayerProjection getCourseByLectureId(UUID lectureId) {
		return courseRepository.findOneById(UUID.fromString(courseRepository.findByLectureId(lectureId).getId()));
	}

	public List<CourseDto> getCourses(Pageable pageable) {
		return courseRepository.getCourses(pageable).stream()
				.map(CourseMapper.MAPPER::courseQueryResultToCourseDto).collect(Collectors.toList());
	}

	public List<CourseDto> getRecommendedCourses(UUID id, Pageable pageable) {
		return getCourses(pageable);
	}

	public CourseDto getCourseById(UUID id) {
		var result = courseRepository.getCourseById(id);
		return CourseMapper.MAPPER.courseQueryResultToCourseDto(courseRepository.getCourseById(id));
	}

	public List<CourseWithMinutesDto> getCoursesWithMinutesByUserId(UUID userId) {
		var author = authorRepository.findByUserId(userId).orElseThrow();
		return courseRepository.findAllByAuthor(author.getId()).stream()
				.map(CourseMapper.MAPPER::courseQueryToCourseWithMinutes).collect(Collectors.toList());
	}

	public List<AuthorCourseDto> getCoursesByAuthorId(UUID authorId) {
		return courseRepository.getCoursesByAuthorId(authorId).stream()
				.map(CourseMapper.MAPPER::authorCourseQueryResultToAuthorCourseDto)
				.collect(Collectors.toUnmodifiableList());
	}
}
