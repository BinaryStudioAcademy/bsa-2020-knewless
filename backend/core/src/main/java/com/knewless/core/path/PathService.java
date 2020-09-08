package com.knewless.core.path;

import com.knewless.core.author.AuthorMapper;
import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.AuthorService;
import com.knewless.core.author.dto.AuthorMainInfoDto;
import com.knewless.core.course.CourseMapper;
import com.knewless.core.course.CourseRepository;
import com.knewless.core.course.model.Course;
import com.knewless.core.course.model.Level;
import com.knewless.core.currentUserCource.CurrentUserCourseRepository;
import com.knewless.core.db.SourceType;
import com.knewless.core.elasticsearch.EsService;
import com.knewless.core.elasticsearch.model.EsDataType;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.dto.*;
import com.knewless.core.path.model.Path;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.student.StudentService;
import com.knewless.core.student.model.Student;
import com.knewless.core.subscription.SubscriptionService;
import com.knewless.core.tag.TagMapper;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.model.Tag;
import com.knewless.core.user.UserService;
import com.knewless.core.user.role.model.Role;
import com.knewless.core.user.role.model.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PathService {

    private final PathRepository pathRepository;
    private final CourseRepository courseRepository;
    private final TagRepository tagRepository;
    private final AuthorRepository authorRepository;
    private final EsService esService;
    private final SubscriptionService subscriptionService;
    private final UserService userService;
    private final AuthorService authorService;
    private final CurrentUserCourseRepository currentUserCourseRepository;
	private final StudentService studentService;

    @Autowired
    public PathService(PathRepository pathRepository, CourseRepository courseRepository,
                       TagRepository tagRepository, AuthorRepository authorRepository,
                       SubscriptionService subscriptionService, EsService esService,
                       UserService userService, AuthorService authorService,
                       CurrentUserCourseRepository currentUserCourseRepository, StudentService studentService) {
        this.pathRepository = pathRepository;
        this.courseRepository = courseRepository;
        this.tagRepository = tagRepository;
        this.authorRepository = authorRepository;
        this.subscriptionService = subscriptionService;
        this.esService = esService;
        this.userService = userService;
        this.currentUserCourseRepository = currentUserCourseRepository;
        this.authorService = authorService;
        this.studentService = studentService;
    }

    public List<PathDto> getPaths(Pageable pageable) {
        return this.pathRepository.getPaths(pageable).stream()
                .map(PathMapper.MAPPER::pathQueryResultToPathDto)
                .collect(Collectors.toList());
    }

    public List<PathDto> getAllPaths() {
        return this.pathRepository.getAllPaths().stream()
                .map(PathMapper.MAPPER::pathQueryResultToPathDto)
                .collect(Collectors.toList());
    }

    public List<AuthorPathDto> getLatestPathsByAuthorId(UUID authorId) {
        return this.pathRepository.getLatestPathsByAuthorId(authorId).stream()
                .map(PathMapper.MAPPER::authorPathQueryResultToAuthorPathDto)
                .collect(Collectors.toList());
    }

    public PathPageDto getPathDataById(UUID id) {
        var path = this.pathRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Path", "pathId", id)
        );
        if (path.getReleasedDate() == null) throw new ResourceNotFoundException("Path", "pathId", id);
        var pathPageDto = PathMapper.MAPPER.pathToPathPageDto(path);
        var authors = new ArrayList<AuthorMainInfoDto>();
        var courses = path.getCourses().stream()
                .map(c -> {
                    var courseDetails = this.courseRepository.getDetailCourseById(c.getId()).orElseThrow();
                    var course = CourseMapper.MAPPER.courseDetailsResultToCourseDetailsDto(courseDetails);
                    var tags = this.tagRepository.getTagsNamesByCourseId(c.getId());
                    tags = tags.size() > 3 ? tags.subList(0, 3) : tags;
                    course.setTags(tags);
                    final var isAuthorCourse = authors.stream()
                            .map(AuthorMainInfoDto::getId)
                            .collect(Collectors.toList())
                            .contains(course.getAuthorId());
                    if (!isAuthorCourse) {
                        var author = this.authorRepository.findOneById(course.getAuthorId()).orElseThrow();
                        var authorInfo = AuthorMapper.MAPPER.authorBriefInfoToMainInfoDto(
                                authorService.getAuthorInfoByUserId(author.getUser().getId())
                        );
                        authorInfo.setBiography(author.getBiography());
                        authors.add(authorInfo);
                    }
                    course.setMembers(currentUserCourseRepository.getMembersByCourse(c.getId()));
                    return course;
                })
                .collect(Collectors.toList());
        pathPageDto.setCourses(courses);
        var tags = path.getTags().stream().map(TagMapper.INSTANCE::tagToDto).collect(Collectors.toList());
        pathPageDto.setTags(tags);
        pathPageDto.setImageSrc(path.getImageTag().getSource());
        long duration = path.getCourses().stream()
                .mapToLong(c -> c.getLectures().stream()
                        .mapToLong(Lecture::getDuration)
                        .sum()
                )
                .sum();
        pathPageDto.setDuration(duration);
        pathPageDto.setAuthors(authors);
        pathPageDto.setUserId(path.getAuthor().getUser().getId());
        pathPageDto.setAuthor(AuthorMapper.MAPPER.authorBriefInfoToMainInfoDto(
                authorService.getAuthorInfoByUserId(path.getAuthor().getUser().getId())
        ));
        pathPageDto.getAuthor().setBiography(path.getAuthor().getBiography());
        return pathPageDto;
    }

    @Transactional
    public UUID create(UUID userId, PathCreationRequestDto request) {
        var path = new Path();
        var courses = this.courseRepository.findAllById(request.getCourses());
        var tags = this.tagRepository.findAllById(request.getTags());
        var author = this.authorRepository.findByUserId(userId).orElseThrow();
        path.setName(request.getName());
        path.setDescription(request.getDescription());
        path.setImageTag(request.getImageTag() == null? null : this.tagRepository.getOne(request.getImageTag()));
        path.setAuthor(author);
        if (request.getIsReleased()) path.setReleasedDate(new Date());
        path.setTags(tags);
        path.setCourses(courses);
        var savedPath = this.pathRepository.save(path);
        var result = savedPath.getId();
        if (request.getIsReleased()) {
            var message = author.getFirstName() + " " + author.getLastName() + " added new path.";
            this.subscriptionService.notifySubscribers(author.getId(), SourceType.AUTHOR, result, SourceType.PATH, message);
            esService.put(EsDataType.PATH, savedPath);
        }
        return result;
    }

    @Transactional
    public UUID update(UUID userId, PathUpdateRequestDto request) {
        var path = this.pathRepository.getOne(request.getId());
        var courses = this.courseRepository.findAllById(request.getCourses());
        var tags = this.tagRepository.findAllById(request.getTags());
        var author = this.authorRepository.findByUserId(userId).orElseThrow();
        path.setName(request.getName());
        path.setDescription(request.getDescription());
        path.setImageTag(request.getImageTag() == null? null : this.tagRepository.getOne(request.getImageTag()));
        path.setAuthor(author);
        path.setTags(tags);
        path.setCourses(courses);
        if (request.getIsReleased()) path.setReleasedDate(new Date());
        var savedPath = this.pathRepository.save(path);
        var result = savedPath.getId();
        if (request.getIsReleased()) {
            var message = author.getFirstName() + " " + author.getLastName() + " updated path: " + path.getName();
            this.subscriptionService.notifySubscribers(author.getId(), SourceType.AUTHOR, result, SourceType.PATH, message);
            esService.update(EsDataType.PATH, savedPath);
        }
        return result;
    }

    public List<PathDto> getPathsByTag(UUID tagId) {
        return this.pathRepository.getPathsByTagId(tagId).stream()
                .map(PathMapper.MAPPER::pathQueryResultToPathDto)
                .collect(Collectors.toList());
    }

    //paths with drafts
    public List<PathWithDraftsDto> getAuthorPathsByUser(UserPrincipal userPrincipal) {
        Role role = userService.getUserRole(userPrincipal.getEmail());
        if (role.getName() != RoleType.AUTHOR) {
            return List.of();
        }
        var author = this.authorRepository.findByUserId(userPrincipal.getId()).orElseThrow();
        var paths1 = this.pathRepository.findAllByAuthor_Id(author.getId());
        return this.pathRepository.findAllByAuthor_Id(author.getId()).stream()
                .sorted((p1, p2) -> (int) ((p2.getReleasedDate() == null ? Integer.MAX_VALUE : p2.getReleasedDate().getTime())
                        - (p1.getReleasedDate() == null ? Integer.MAX_VALUE : p1.getReleasedDate().getTime())))
                .map(PathMapper.MAPPER::pathToPathWithDraftsDto)
                .collect(Collectors.toList());
    }

    public List<PathDto> getStudentPathsByUser(UserPrincipal userPrincipal) {
        return this.pathRepository.getPathsByUserId(userPrincipal.getId()).stream()
                .map(PathMapper.MAPPER::pathQueryResultToPathDto)
                .collect(Collectors.toList());
    }

    //path with drafts
    public PathDetailsDto getPathById(UserPrincipal user, UUID id) {
        var author = this.authorRepository.findByUserId(user.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Author", "userId", user.getId())
        );
        var path = this.pathRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Path", "pathId", id)
        );
        if (!path.getAuthor().getId().toString().equals(author.getId().toString())) {
            throw new ResourceNotFoundException("Author", "userId", user.getId());
        }
        var pathDetailsDto = PathMapper.MAPPER.pathToPathDetailsDto(path);

        var courses = path.getCourses().stream()
                .map(c -> {
                    var course = this.courseRepository.findCourseById(c.getId()).orElseThrow();
                    return CourseMapper.MAPPER.courseQueryToCourseWithMinutes(course);
                })
                .collect(Collectors.toList());
        pathDetailsDto.setCourses(courses);

        var tags = path.getTags().stream().map(TagMapper.INSTANCE::tagToDto).collect(Collectors.toList());
        pathDetailsDto.setTags(tags);
        int duration = path.getCourses().stream()
                .mapToInt(c -> c.getLectures().stream()
                        .mapToInt(Lecture::getDuration)
                        .sum()
                )
                .sum();
        pathDetailsDto.setDuration(duration);
        return pathDetailsDto;
    }

    public List<FavouritePathResponseDto> getFavouritePathsByUser(UUID userId) {
		List<Path> paths = pathRepository.getFavouritePathsByUserId(userId, SourceType.PATH);
		List<FavouritePathResponseDto> result = new ArrayList<>();
		paths.forEach(p -> result.add(PathMapper.MAPPER.pathToFavouritePathResponseDto(p)));
        return result;
    }

	public List<PathDto> getAdditionalPaths(List<UUID> id, Pageable pageable) {
		List<PathQueryResult> result;
    	if (id.isEmpty()) {
    		result = pathRepository.getPaths(pageable);
		} else {
    		result = pathRepository.getAdditionalPaths(id, pageable);
		}
    	return result.stream()
				.map(PathMapper.MAPPER::pathQueryResultToPathDto)
				.collect(Collectors.toList());
	}

	public List<PathDto> getRecommended(UUID userId) {
        Student student = studentService.findByUserId(userId);

        List<UUID> tags = Stream.concat(
                    pathRepository.getPathsByUserId(userId).stream().map(path -> pathRepository.getTagsByPathId(path.getId())).flatMap(Collection::stream),
                    student.getUser().getTags().stream()
                )
                .filter(Objects::nonNull)
                .map(Tag::getId)
                .distinct()
                .collect(Collectors.toList());

        var userPathsIds = pathRepository.getPathsByUserId(userId).stream()
				.map(PathQueryResult::getId)
				.distinct()
				.collect(Collectors.toList());

        var level = Level.valueOf(student.getLevel().toUpperCase());

        var result = pathRepository.getPathsByTagIds(tags).stream()
				.filter(path -> !userPathsIds.contains(path.getId()))
				.filter(path -> pathRepository.findById(path.getId()).get().getCourses().stream()
						.map(Course::getLevel)
						.anyMatch(name -> name.equals(level)
								|| (level.ordinal() != 2 && name.equals(Level.values()[level.ordinal()+1]))))
				.limit(3)
				.map(PathMapper.MAPPER::pathQueryResultToPathDto)
				.collect(Collectors.toList());

		if (result.size() < 3) {
		    result.forEach(path -> userPathsIds.add(path.getId()));
			result.addAll(getAdditionalPaths(userPathsIds, PageRequest.of(0, result.isEmpty() ? 3 : 3 - result.size())));
		}

		return result;
	}
}
