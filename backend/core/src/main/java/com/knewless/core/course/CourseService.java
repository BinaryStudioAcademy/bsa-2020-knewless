package com.knewless.core.course;

import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import com.knewless.core.course.model.Level;
import com.knewless.core.db.SourceType;
import com.knewless.core.lecture.Dto.ShortLectureDto;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.homework.HomeworkRepository;
import com.knewless.core.lecture.homework.model.Homework;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.subscription.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final SubscriptionService subscriptionService;

    @Autowired
    public CourseService(CourseRepository courseRepository, LectureRepository lectureRepository,
                         AuthorRepository authorRepository, HomeworkRepository homeworkRepository,
                         SubscriptionService subscriptionService) {
        this.courseRepository = courseRepository;
        this.lectureRepository = lectureRepository;
        this.authorRepository = authorRepository;
        this.homeworkRepository = homeworkRepository;
        this.subscriptionService = subscriptionService;
    }

    public CreateCourseResponseDto createCourse(CreateCourseRequestDto request, UUID userid) {
        Author author = authorRepository.findByUserId(userid).orElseThrow();
        List<Lecture> allLectures = lectureRepository.getLecturesByUserId(userid);
        List<UUID> idLecturesToSave = request.getLectures();
        allLectures.removeIf(l -> !idLecturesToSave.contains(l.getId()));
        List<Lecture> thisLectures = new ArrayList<>();
        List<Homework> homeworks = new ArrayList<>();
        Course course = Course.builder().level(Level.valueOf(request.getLevel())).author(author)
                .name(request.getName()).description(request.getDescription()).image(request.getImage()).build();
        for (Lecture l : allLectures) {
            Lecture lec;
            if (l.getCourse() == null) {
                lec = l;
            } else {
                lec = Lecture.builder().name(l.getName()).sourceUrl(l.getSourceUrl()).description(l.getDescription())
                        .duration(l.getDuration()).build();
            }
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
        String message = author.getFirstName() + " " + author.getLastName() + " added new course.";
        subscriptionService.notifySubscribers(author.getId(), SourceType.AUTHOR, course.getId(), SourceType.COURSE, message);
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

    public CourseWithMinutesDto getCourseWithMinutesById(UUID id) {
        return CourseMapper.MAPPER.courseQueryToCourseWithMinutes(courseRepository.getCourseById(id));
    }

    public List<CourseWithMinutesDto> getCoursesWithMinutesByUserId(UUID userId) {
        var author = authorRepository.findByUserId(userId).orElseThrow();
        return courseRepository.findAllByAuthor(author.getId()).stream()
                .map(CourseMapper.MAPPER::courseQueryToCourseWithMinutes).collect(Collectors.toList());
    }

    public List<AuthorCourseDto> getLatestCoursesByAuthorId(UUID authorId) {
        return courseRepository.getLatestCoursesByAuthorId(authorId).stream()
                .map(CourseMapper.MAPPER::authorCourseQueryResultToAuthorCourseDto)
                .collect(Collectors.toUnmodifiableList());
    }

}
