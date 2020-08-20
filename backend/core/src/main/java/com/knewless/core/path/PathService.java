package com.knewless.core.path;

import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.CourseRepository;
import com.knewless.core.db.SourceType;
import com.knewless.core.elasticsearch.EsService;
import com.knewless.core.elasticsearch.model.EsDataType;
import com.knewless.core.path.dto.AuthorPathDto;
import com.knewless.core.path.dto.PathCreationRequestDto;
import com.knewless.core.path.dto.PathDto;
import com.knewless.core.path.dto.PathDurationDto;
import com.knewless.core.path.model.Path;
import com.knewless.core.subscription.SubscriptionService;
import com.knewless.core.tag.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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

	@Autowired
	public PathService(PathRepository pathRepository, CourseRepository courseRepository,
					   TagRepository tagRepository, AuthorRepository authorRepository,
					   SubscriptionService subscriptionService, EsService esService) {
		this.pathRepository = pathRepository;
		this.courseRepository = courseRepository;
		this.tagRepository = tagRepository;
		this.authorRepository = authorRepository;
		this.subscriptionService = subscriptionService;
		this.esService = esService;
	}


    public List<PathDto> getPaths(Pageable pageable) {
        var pathInfo = pathRepository.getAllPaths(pageable);
        return pathInfo.stream().map(p -> {
            var path = PathMapper.MAPPER.pathQueryResultToPathDto(p);
            path.setDuration(getDuration(p.getMinutes()));
            return path;
        }).collect(Collectors.toList());
    }

    public PathDurationDto getDuration(long minutes) {
        Duration d = Duration.ofMinutes(minutes);
        var timeWithUnits = new LinkedHashMap<Long, String>();

        timeWithUnits.put(d.toDaysPart() / 7, "Weeks");
        timeWithUnits.put(d.toDaysPart(), "Days");
        timeWithUnits.put((long) d.toHoursPart(), "Hours");

        for (Map.Entry<Long, String> entry : timeWithUnits.entrySet()) {
            Long value = entry.getKey();
            if (value >= 1) {
                return new PathDurationDto(value, entry.getValue());
            }
        }
        return new PathDurationDto(minutes, "Minutes");
    }

    public List<AuthorPathDto> getLatestPathsByAuthorId(UUID authorId) {
        return pathRepository.getLatestPathsByAuthorId(authorId).stream()
                .map(p -> {
                    var path = PathMapper.MAPPER.authorPathQueryResultToAuthorPathDto(p);
                    path.setDuration(getDuration(p.getMinutes()));
                    return path;
                })
                .collect(Collectors.toList());
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
		Author author = authorRepository.findByUserId(userId).orElseThrow();
		String message = author.getFirstName()+" "+ author.getLastName()+" added new path.";
		Path savedPath = pathRepository.save(path);
		var result = savedPath.getId();
		subscriptionService.notifySubscribers(author.getId(), SourceType.AUTHOR, result, SourceType.PATH, message);

		CompletableFuture.runAsync(() -> esService.put(EsDataType.PATH, savedPath));
		return result;
	}
}
