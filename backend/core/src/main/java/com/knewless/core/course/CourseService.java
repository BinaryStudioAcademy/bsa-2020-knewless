package com.knewless.core.course;

import com.knewless.core.author.AuthorMapper;
import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.AuthorService;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import com.knewless.core.course.model.Level;
import com.knewless.core.elasticsearch.EsService;
import com.knewless.core.elasticsearch.model.EsDataType;
import com.knewless.core.db.SourceType;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.lecture.LectureMapper;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.homework.HomeworkRepository;
import com.knewless.core.lecture.homework.model.Homework;
import com.knewless.core.lecture.mapper.LectureProjectionMapper;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.user.UserService;
import com.knewless.core.user.role.model.Role;
import com.knewless.core.user.role.model.RoleType;
import com.knewless.core.subscription.SubscriptionService;
import com.knewless.core.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final LectureRepository lectureRepository;
    private final AuthorRepository authorRepository;
    private final HomeworkRepository homeworkRepository;
    private final TagRepository tagRepository;
    private final UserService userService;
    private final AuthorService authorService;
    private final SubscriptionService subscriptionService;
    private final TagService tagService;
    private final EsService esService;

    @Value(value = "${fs.video_url}")
    private String URL;

    @Autowired
    public CourseService(CourseRepository courseRepository, LectureRepository lectureRepository,
                         AuthorRepository authorRepository, HomeworkRepository homeworkRepository,
                         TagRepository tagRepository, UserService userService,
                         AuthorService authorService, SubscriptionService subscriptionService,
                         TagService tagService, EsService esService) {
        this.courseRepository = courseRepository;
        this.lectureRepository = lectureRepository;
        this.authorRepository = authorRepository;
        this.homeworkRepository = homeworkRepository;
        this.authorService = authorService;
        this.subscriptionService = subscriptionService;
        this.tagService = tagService;
        this.esService = esService;
        this.tagRepository = tagRepository;
        this.userService = userService;
    }

    public CreateCourseResponseDto createCourse(CreateCourseRequestDto request, UUID userId) {
        Author author = authorRepository.findByUserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Author", "userId", userId)
        );
        List<Lecture> allLectures = lectureRepository.getLecturesByUserId(userId);
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
                lec = Lecture.builder().name(l.getName())
                        .webLink(l.getWebLink())
                        .urlOrigin(l.getUrlOrigin())
                        .url1080(l.getUrl1080())
                        .url720(l.getUrl720())
                        .url480(l.getUrl480())
                        .description(l.getDescription())
                        .duration(l.getDuration()).build();
            }
            if (l.getHomework() != null) {
                Homework homework = new Homework(l.getHomework().getDescription(), lec);
                homeworks.add(homework);
            }
            thisLectures.add(lec);
        }
        if (request.getIsReleased()) course.setReleasedDate(new Date());

        Course savedCourse = courseRepository.save(course);

        homeworkRepository.saveAll(homeworks);
        thisLectures.forEach(l -> {
            l.setCourse(course);
            Optional<Homework> ophw = homeworks.stream().filter(h -> h.getLecture().getId().equals(l.getId())).findFirst();
            ophw.ifPresent(l::setHomework);
        });
        List<Lecture> lectures = lectureRepository.saveAll(thisLectures);

        savedCourse.setLectures(lectures);
        CompletableFuture.runAsync(() -> esService.put(EsDataType.COURSE, savedCourse));

        String message = author.getFirstName() + " " + author.getLastName() + " added new course.";
        subscriptionService.notifySubscribers(author.getId(), SourceType.AUTHOR, course.getId(), SourceType.COURSE, message);
        return new CreateCourseResponseDto(course.getId(), true);
	}

    public CourseToPlayerDto getCourseByLectureId(UUID lectureId) {
        var courseProjection = courseRepository.findOneById(UUID.fromString(courseRepository.findByLectureId(lectureId).getId()));
        CourseToPlayerDto course = new CourseToPlayerDto();
        course.setId(courseProjection.getId());
        course.setName(courseProjection.getName());
        course.setAuthor(courseProjection.getAuthor());
        course.setLectures(courseProjection.getLectures()
                .stream()
                .map( l -> new LectureProjectionMapper().fromProjection(l,URL))
                .collect(Collectors.toList()));
         return course;
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


    public List<CourseDetailsDto> getUserCourses(UUID id) {
        return courseRepository.getDetailCoursesByUserId(id)
                .stream()
                .map(c -> {
                    List<String> tags = tagRepository.getTagsByCourse(c.getId());
                    tags = tags.size() > 3 ? tags.subList(0, 3) : tags;
                    CourseDetailsDto course = CourseMapper.MAPPER.courseDetailsResultToCourseDetailsDto(c);
                    course.setTags(tags);
                    return course;
                }).collect(Collectors.toList());
    }

    public List<CourseDetailsDto> getAllCourses(Pageable pageable) {
        return courseRepository.getDetailCourses(pageable)
                .stream()
                .map(c -> {
                    List<String> tags = tagRepository.getTagsByCourse(c.getId());
                    tags = tags.size() > 3 ? tags.subList(0, 3) : tags;
                    CourseDetailsDto course = CourseMapper.MAPPER.courseDetailsResultToCourseDetailsDto(c);
                    course.setTags(tags);
                    return course;
                }).collect(Collectors.toList());
    }

    public List<CourseDetailsDto> getAllCoursesByLectureTag(UUID tagId) {
        return courseRepository.getDetailCoursesByLectureTag(tagId)
                .stream()
                .map(c -> {
                    List<String> tags = tagRepository.getTagsByCourse(c.getId());
                    tags = tags.size() > 3 ? tags.subList(0, 3) : tags;
                    CourseDetailsDto course = CourseMapper.MAPPER.courseDetailsResultToCourseDetailsDto(c);
                    course.setTags(tags);
                    return course;
                }).collect(Collectors.toList());
    }

    public List<CourseDetailsDto> getAllAuthorCourses(UserPrincipal user) {
        Role role = userService.getUserRole(user.getEmail());
        if (role.getName() != RoleType.AUTHOR) {
            return  List.of();
        }
        Author author = authorRepository.findByUserId(user.getId()).orElseThrow();

        return courseRepository.getDetailCoursesByAuthorId(author.getId())
                .stream()
                .map(c -> {
                    List<String> tags = tagRepository.getTagsByCourse(c.getId());
                    tags = tags.size() > 3 ? tags.subList(0, 3) : tags;
                    CourseDetailsDto course = CourseMapper.MAPPER.courseDetailsResultToCourseDetailsDto(c);
                    course.setTags(tags);
                    return course;
                }).collect(Collectors.toList());
    }
}
