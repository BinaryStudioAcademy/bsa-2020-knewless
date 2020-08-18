package com.knewless.core.course;

import com.knewless.core.author.AuthorMapper;
import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.AuthorService;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import com.knewless.core.course.model.Level;
import com.knewless.core.exception.ResourceNotFoundException;
import com.knewless.core.db.SourceType;
import com.knewless.core.lecture.Dto.ShortLectureDto;
import com.knewless.core.lecture.LectureMapper;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.homework.HomeworkRepository;
import com.knewless.core.lecture.homework.model.Homework;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.subscription.SubscriptionService;
import com.knewless.core.tag.TagMapper;
import com.knewless.core.tag.TagService;
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
    private final AuthorService authorService;
    private final SubscriptionService subscriptionService;
    private final TagService tagService;

    @Autowired
    public CourseService(CourseRepository courseRepository, LectureRepository lectureRepository,
                         AuthorRepository authorRepository, HomeworkRepository homeworkRepository,
                         AuthorService authorService, SubscriptionService subscriptionService,
                         TagService tagService) {
        this.courseRepository = courseRepository;
        this.lectureRepository = lectureRepository;
        this.authorRepository = authorRepository;
        this.homeworkRepository = homeworkRepository;
        this.authorService = authorService;
        this.subscriptionService = subscriptionService;
        this.tagService = tagService;
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

    public CourseFullInfoDto getAllCourseInfoById(UUID id) {
        Course courseEntity = courseRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Course", "id", id)
        );
        var course = CourseMapper.MAPPER.courseToCourseFullInfoDto(courseEntity);
        var courseWithRating = getCourseById(id);

        course.setRating(courseWithRating.getRating());
        course.setDuration(courseWithRating.getDuration());
        course.setAuthor(AuthorMapper.MAPPER.authorBriefInfoToMainInfoDto(
                authorService.getAuthorInfoByUserId(courseEntity.getAuthor().getUser().getId())
        ));
        course.getAuthor().setBiography(courseEntity.getAuthor().getBiography());
        course.setAuthorCourses(getLatestCoursesByAuthorId(course.getAuthor().getId()));
        course.setLectures(courseEntity.getLectures()
                .stream()
                .map(LectureMapper.MAPPER::lectureToShortLectureDto)
                .collect(Collectors.toList()));
        course.setTags(courseEntity.getLectures().stream().flatMap(l ->
                tagService.getByLectureId(l.getId()).stream()).collect(Collectors.toSet()));
        return course;
    }

}
