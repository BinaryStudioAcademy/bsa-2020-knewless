package com.knewless.core.course;

import com.knewless.core.author.AuthorMapper;
import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.AuthorService;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.courseReaction.CourseReactionRepository;
import com.knewless.core.course.courseReaction.model.CourseReaction;
import com.knewless.core.course.dto.*;
import com.knewless.core.course.model.Course;
import com.knewless.core.course.model.Level;
import com.knewless.core.db.SourceType;
import com.knewless.core.currentUserCource.CurrentUserCourseRepository;
import com.knewless.core.elasticsearch.EsService;
import com.knewless.core.elasticsearch.model.EsDataType;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.favorite.FavoriteService;
import com.knewless.core.history.WatchHistoryService;
import com.knewless.core.lecture.LectureMapper;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.homework.HomeworkRepository;
import com.knewless.core.lecture.homework.model.Homework;
import com.knewless.core.lecture.mapper.LectureProjectionMapper;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.subscription.SubscriptionService;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.TagService;
import com.knewless.core.user.UserService;
import com.knewless.core.user.model.User;
import com.knewless.core.user.role.model.Role;
import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.user.role.model.RoleType;
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
    private final CourseReactionRepository reactionRepository;
    private final AuthorRepository authorRepository;
    private final HomeworkRepository homeworkRepository;
    private final TagRepository tagRepository;
    private final UserService userService;
    private final AuthorService authorService;
    private final SubscriptionService subscriptionService;
    private final TagService tagService;
    private final EsService esService;
    private final CurrentUserCourseRepository currentUserCourseRepository;
    private final WatchHistoryService watchHistoryService;

    @Autowired
    private FavoriteService favoriteService;

    @Value(value = "${fs.video_url}")
    private String URL;

    @Autowired
    public CourseService(CourseRepository courseRepository, LectureRepository lectureRepository,
                         AuthorRepository authorRepository, HomeworkRepository homeworkRepository,
                         TagRepository tagRepository, UserService userService,
                         AuthorService authorService, SubscriptionService subscriptionService,
                         TagService tagService, EsService esService, CourseReactionRepository reactionRepository,
                         CurrentUserCourseRepository currentUserCourseRepository, WatchHistoryService watchHistoryService) {
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
        this.reactionRepository = reactionRepository;
        this.currentUserCourseRepository = currentUserCourseRepository;
        this.watchHistoryService = watchHistoryService;
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
                .name(request.getName()).description(request.getDescription()).image(request.getImage())
                .overview(request.getOverview()).build();
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

    public CreateCourseResponseDto updateCourse(CreateCourseRequestDto request, UUID userId) {
        Author author = authorRepository.findByUserId(userId).orElseThrow(
                () -> new ResourceNotFoundException("Author", "userId", userId)
        );
        String authorId = author.getId().toString();
        String requestAuthorId = request.getUserId().toString();
        if (!authorId.equals(requestAuthorId)) {
            throw new ResourceNotFoundException("Author", "userId", userId);
        }

        Course course = courseRepository.findById(request.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Course", "id", request)
        );

        course.setName(request.getName());
        course.setImage(request.getImage());
        course.setLevel(Level.valueOf(request.getLevel()));
        course.setDescription(request.getDescription());

        List<Lecture> lectures = lectureRepository.findAllById(request.getLectures());
        course.setLectures(lectures);

        if (request.getIsReleased()) {
            course.setReleasedDate(new Date());
        }
        Course updatedCourse = courseRepository.save(course);

        CompletableFuture.runAsync(() -> esService.update(EsDataType.COURSE, updatedCourse));

        String message = author.getFirstName() + " " + author.getLastName() + " updated course: " + updatedCourse.getName();
        subscriptionService.notifySubscribers(author.getId(), SourceType.AUTHOR, course.getId(), SourceType.COURSE, message);
        return new CreateCourseResponseDto(updatedCourse.getId(), true);
    }

    public CourseToPlayerDto getCourseByLectureId(UUID lectureId, UUID userId) {
        var courseProjection = courseRepository.findOneById(UUID.fromString(courseRepository.findByLectureId(lectureId).getId()));
        CourseToPlayerDto course = new CourseToPlayerDto();
        course.setId(courseProjection.getId());
        course.setName(courseProjection.getName());
        course.setAuthor(courseProjection.getAuthor());
        var lectures = courseProjection.getLectures()
                .stream()
                .map(l -> new LectureProjectionMapper().fromProjection(l, URL))
                .collect(Collectors.toList());

        course.setLectures(favoriteService.checkFavouriteLecturesToPlayer(userId, lectures));
        course.setReviewed(reactionRepository.existsByCourseIdAndUserId(UUID.fromString(courseProjection.getId()), userId));
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

    public CourseProfileDto getCourseProfileById(UUID id, UUID userId) {
        CourseProfileDto course = CourseMapper.MAPPER.courseQueryToCourseProfileDto(courseRepository.getCourseById(id));
        long progress = ((watchHistoryService.getProgress(id, userId) * 100) / course.getTimeSeconds());
        course.setProgress((int) (progress > 100 ? 100 : progress));
        return course;
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

    public CourseFullInfoDto getAllCourseInfoById(UUID id, UUID userId) {
        Course courseEntity = courseRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Course", "id", id)
        );
        var course = CourseMapper.MAPPER.courseToCourseFullInfoDto(courseEntity);
        var courseWithRating = getCourseById(id);

        if (userId != null) {
            reactionRepository.findByCourseIdAndUserId(id, userId).ifPresent(userRating -> course.setReview(userRating.getReaction()));
            course.setProgress(watchHistoryService.getProgress(userId, id));
        }

        course.setRatingCount(reactionRepository.countByCourseId(id));
        course.setRating(courseWithRating.getRating());
        course.setDuration(courseWithRating.getDuration());
        course.setAuthor(AuthorMapper.MAPPER.authorBriefInfoToMainInfoDto(
                authorService.getAuthorInfoByUserId(courseEntity.getAuthor().getUser().getId())
        ));
        course.getAuthor().setBiography(courseEntity.getAuthor().getBiography());
        course.setAuthorCourses(getLatestCoursesByAuthorId(course.getAuthor().getId()));
        List<ShortLectureDto> lectures = courseEntity.getLectures()
                .stream()
                .map(LectureMapper.MAPPER::lectureToShortLectureDto)
                .collect(Collectors.toList());
        course.setLectures(favoriteService.checkFavouriteLectures(userId, lectures));
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
                    course.setMembers(currentUserCourseRepository.getMembersByCourse(c.getId()));
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
                    course.setMembers(currentUserCourseRepository.getMembersByCourse(c.getId()));
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
                    course.setMembers(currentUserCourseRepository.getMembersByCourse(c.getId()));
                    return course;
                }).collect(Collectors.toList());
    }

    public List<CourseDetailsDto> getAllAuthorCourses(UserPrincipal user) {
        Role role = userService.getUserRole(user.getEmail());
        if (role.getName() != RoleType.AUTHOR) {
            return List.of();
        }
        Author author = authorRepository.findByUserId(user.getId()).orElseThrow();

        return courseRepository.getDetailCoursesByAuthorId(author.getId())
                .stream()
                .map(c -> {
                    List<String> tags = tagRepository.getTagsByCourse(c.getId());
                    tags = tags.size() > 3 ? tags.subList(0, 3) : tags;
                    CourseDetailsDto course = CourseMapper.MAPPER.courseDetailsResultToCourseDetailsDto(c);
                    course.setTags(tags);
                    course.setMembers(currentUserCourseRepository.getMembersByCourse(c.getId()));
                    return course;
                }).collect(Collectors.toList());
    }

    public CourseFullInfoDto getEditCourseById(UserPrincipal user, UUID id) {
        Author author = authorRepository.findByUserId(user.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Author", "userId", user.getId())
        );
        CourseFullInfoDto course = getAllCourseInfoById(id, user.getId());

        String courseAuthorId = course.getAuthor().getId().toString();
        String authorId = author.getId().toString();
        if (!authorId.equals(courseAuthorId)) {
            throw new ResourceNotFoundException("Author", "userId", user.getId());
        }
        return course;
    }

    public int setRating(UUID userId, int rating, UUID courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(
                () -> new ResourceNotFoundException("Course", "courseId", courseId)
        );
        if (reactionRepository.existsByCourseIdAndUserId(courseId, userId)) {
            return getCourseRating(courseId);
        }
        User user = userService.findUserById(userId);

        CourseReaction reaction = new CourseReaction();
        reaction.setReaction(rating);
        reaction.setCourse(course);
        reaction.setUser(user);

        reactionRepository.save(reaction);

        CompletableFuture.runAsync(() -> esService.updateCourseRating(courseId, getCourseById(courseId).getRating()));

        return getCourseRating(courseId);
    }

    public int getCourseRating(UUID courseId) {
        return (int) Math.round(reactionRepository.findByCourseId(courseId).stream()
                .mapToInt(CourseReaction::getReaction)
                .average().orElse(0));
    }

    public List<FavouriteCourseResponseDto> getFavouriteCoursesByUser(UUID userId) {
        List<Course> courses = courseRepository.getFavouriteCoursesByUserId(userId, SourceType.COURSE);
        List<FavouriteCourseResponseDto> result = new ArrayList<>();
        courses.forEach(c-> result.add(CourseMapper.MAPPER.courseToFavouriteCourseResponseDto(c)));
        return result;
    }
}
