package com.knewless.core.path;

import com.knewless.core.author.AuthorMapper;
import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.AuthorService;
import com.knewless.core.author.dto.AuthorMainInfoDto;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.CourseMapper;
import com.knewless.core.course.CourseRepository;
import com.knewless.core.course.dto.CourseDetailsDto;
import com.knewless.core.course.dto.CourseWithMinutesDto;
import com.knewless.core.currentUserCource.CurrentUserCourseRepository;
import com.knewless.core.db.SourceType;
import com.knewless.core.elasticsearch.EsService;
import com.knewless.core.elasticsearch.model.EsDataType;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.dto.*;
import com.knewless.core.path.model.Path;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.subscription.SubscriptionService;
import com.knewless.core.tag.TagMapper;
import com.knewless.core.tag.TagRepository;
import com.knewless.core.tag.dto.TagDto;
import com.knewless.core.user.UserService;
import com.knewless.core.user.role.model.Role;
import com.knewless.core.user.role.model.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

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

    @Autowired
    public PathService(PathRepository pathRepository, CourseRepository courseRepository,
                       TagRepository tagRepository, AuthorRepository authorRepository,
                       SubscriptionService subscriptionService, EsService esService,
                       UserService userService, AuthorService authorService,
                       CurrentUserCourseRepository currentUserCourseRepository) {
        this.pathRepository = pathRepository;
        this.courseRepository = courseRepository;
        this.tagRepository = tagRepository;
        this.authorRepository = authorRepository;
        this.subscriptionService = subscriptionService;
        this.esService = esService;
        this.userService = userService;
        this.currentUserCourseRepository = currentUserCourseRepository;
        this.authorService = authorService;
    }


    public List<PathDto> getPaths(Pageable pageable) {
        var pathInfo = pathRepository.getAllPaths(pageable);
        return pathInfo.stream().map(PathMapper.MAPPER::pathQueryResultToPathDto)
                .collect(Collectors.toList());
    }

    public List<AuthorPathDto> getLatestPathsByAuthorId(UUID authorId) {
        return pathRepository.getLatestPathsByAuthorId(authorId).stream()
                .map(PathMapper.MAPPER::authorPathQueryResultToAuthorPathDto)
                .collect(Collectors.toList());
    }

    public PathPageDto getPathDataById(UUID id) {
        Path path = pathRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Path", "pathId", id)
        );

        PathPageDto pathPageDto = PathMapper.MAPPER.pathToPathPageDto(path);
        List<AuthorMainInfoDto> authors = new ArrayList<>();
        List<CourseDetailsDto> courses = path.getCourses().stream().map(c -> {
            var course = CourseMapper.MAPPER.courseDetailsResultToCourseDetailsDto(courseRepository.getDetailCourseById(c.getId()));
            List<String> tags = tagRepository.getTagsNamesByCourseId(c.getId());
            tags = tags.size() > 3 ? tags.subList(0, 3) : tags;
            course.setTags(tags);
            if (!authors.stream().map(AuthorMainInfoDto::getId).collect(Collectors.toList()).contains(course.getAuthorId())) {
                Author authorEntity = authorRepository.findOneById(course.getAuthorId()).orElseThrow();
                AuthorMainInfoDto author = AuthorMapper.MAPPER.authorBriefInfoToMainInfoDto(
                        authorService.getAuthorInfoByUserId(authorEntity.getUser().getId())
                );
                author.setBiography(authorEntity.getBiography());
                authors.add(author);
            }
            course.setMembers(currentUserCourseRepository.getMembersByCourse(c.getId()));
            return course;
        }).collect(Collectors.toList());
        pathPageDto.setCourses(courses);
        List<TagDto> tags = path.getTags().stream().map(TagMapper.INSTANCE::tagToDto).collect(Collectors.toList());
        pathPageDto.setTags(tags);
        pathPageDto.setImageSrc(path.getImageTag().getSource());
        long duration = path.getCourses().stream().mapToLong(
                c -> c.getLectures().stream().mapToLong(Lecture::getDuration).sum()
        ).sum();
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
		Path path = new Path();
		var courses = courseRepository.findAllById(request.getCourses());
		var tags = tagRepository.findAllById(request.getTags());
		path.setName(request.getName());
		path.setDescription(request.getDescription());
		path.setImageTag(tagRepository.getOne(request.getImageTag()));
		path.setAuthor(authorRepository.findByUserId(userId).orElseThrow());
		path.setTags(tags);
		path.setCourses(courses);
		Path savedPath = pathRepository.save(path);

		var result = savedPath.getId();

		Author author = authorRepository.findByUserId(userId).orElseThrow();
		String message = author.getFirstName()+" "+ author.getLastName() + " added new path.";
		subscriptionService.notifySubscribers(author.getId(), SourceType.AUTHOR, result, SourceType.PATH, message);

		CompletableFuture.runAsync(() -> esService.put(EsDataType.PATH, savedPath));
		return result;
	}

	@Transactional
	public UUID update(UUID userId, PathUpdateRequestDto request) {
		Path path = pathRepository.getOne(request.getId());
		var courses = courseRepository.findAllById(request.getCourses());
		var tags = tagRepository.findAllById(request.getTags());
		path.setName(request.getName());
		path.setDescription(request.getDescription());
		path.setImageTag(tagRepository.getOne(request.getImageTag()));
		path.setAuthor(authorRepository.findByUserId(userId).orElseThrow());
		path.setTags(tags);
		path.setCourses(courses);
		Path savedPath = pathRepository.save(path);

		var result = savedPath.getId();

		Author author = authorRepository.findByUserId(userId).orElseThrow();
		String message = author.getFirstName()+" "+ author.getLastName() + " updated path: " + path.getName();
		subscriptionService.notifySubscribers(author.getId(), SourceType.AUTHOR, result, SourceType.PATH, message);

		CompletableFuture.runAsync(() -> esService.update(EsDataType.PATH, savedPath));
		return result;
	}

	public List<PathDto> getPathsByTag(UUID tagId) {
		return pathRepository.getPathsByTagId(tagId)
				.stream().map(PathMapper.MAPPER::pathQueryResultToPathDto).collect(Collectors.toList());
	}

	public List<PathDto> getAuthorPathsByUser(UserPrincipal userPrincipal) {
		Role role = userService.getUserRole(userPrincipal.getEmail());
		if (role.getName() != RoleType.AUTHOR) {
			return  List.of();
		}
		Author author = authorRepository.findByUserId(userPrincipal.getId()).orElseThrow();
		return pathRepository.getAllPathsByAuthorId(author.getId())
				.stream().map(PathMapper.MAPPER::pathQueryResultToPathDto).collect(Collectors.toList());
	}

	public List<PathDto> getStudentPathsByUser(UserPrincipal userPrincipal) {
		return pathRepository.getPathsByUserId(userPrincipal.getId())
				.stream().map(PathMapper.MAPPER::pathQueryResultToPathDto).collect(Collectors.toList());
	}

	public PathDetailsDto getPathById(UserPrincipal user, UUID id) {
		Author author = authorRepository.findByUserId(user.getId()).orElseThrow(
				() -> new ResourceNotFoundException("Author", "userId", user.getId())
		);

		Path path = pathRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Path", "pathId", id)
		);

		if (!path.getAuthor().getId().toString().equals(author.getId().toString())) {
			throw new ResourceNotFoundException("Author", "userId", user.getId());
		}

		PathDetailsDto pathDetailsDto = PathMapper.MAPPER.pathToPathDetailsDto(path);

		List<CourseWithMinutesDto> courses = path.getCourses().stream().map(c -> {
			var course = courseRepository.findCourseById(c.getId()).orElseThrow();
			return CourseMapper.MAPPER.courseQueryToCourseWithMinutes(course);
		}).collect(Collectors.toList());
		pathDetailsDto.setCourses(courses);

		List<TagDto> tags = path.getTags().stream().map(TagMapper.INSTANCE::tagToDto).collect(Collectors.toList());
		pathDetailsDto.setTags(tags);
		int duration = path.getCourses().stream().mapToInt(
				c -> c.getLectures().stream().mapToInt(Lecture::getDuration).sum()
		).sum();

		pathDetailsDto.setDuration(duration);
		return pathDetailsDto;
	}

	public List<FavouritePathResponseDto> getFavouritePathsByUser(UUID userId){
		List<Path> paths = pathRepository.findTop10ByAuthorIsNotNull();
		//List<Path> paths = pathRepository.getFavouritePathsByUserId(userId, SourceType.PATH); line should be uncommented, when path could be added
		List<FavouritePathResponseDto> result = new ArrayList<>();
		paths.forEach(p -> result.add(PathMapper.MAPPER.pathToFavouritePathResponseDto(p)));
		return result;
	}
}
