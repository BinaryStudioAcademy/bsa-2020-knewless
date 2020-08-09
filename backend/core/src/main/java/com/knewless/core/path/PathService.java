package com.knewless.core.path;

import com.knewless.core.path.dto.PathDto;
import com.knewless.core.path.dto.PathDurationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PathService {

    private final PathRepository pathRepository;

    @Autowired
    public PathService(PathRepository pathRepository) {
        this.pathRepository = pathRepository;
    }

    public List<PathDto> getPathsByAuthorId(UUID authorId) {
        return this.pathRepository.findPathsByAuthorId(authorId)
                .stream()
                .map(p -> new PathDto(p.getName(), p.getCourses(), p.getImage(), getDuration(p.getMinutes())))
                .collect(Collectors.toUnmodifiableList());
    }

    List<PathDto> getAllPaths() {
        var pathInfo = pathRepository.getAllPaths();
        return pathInfo.stream().map(p -> {
            var path = PathMapper.MAPPER.pathQueryResultToPathDto(p);
            path.setDuration(getDuration(p.getMinutes()));
            return path;
        }).collect(Collectors.toList());
    }

    public PathDurationDto getDuration(long minutes) {
        Duration d = Duration.ofMinutes(minutes);
        var timeWithUnits = new LinkedHashMap<Long, String>();

        timeWithUnits.put(d.toDaysPart()/7, "Weeks");
        timeWithUnits.put(d.toDaysPart(), "Days");
        timeWithUnits.put((long) d.toHoursPart(), "Hours");

        for (Map.Entry<Long, String> entry : timeWithUnits.entrySet()) {
             Long value = entry.getKey();
             if(value >= 1) {
                 return new PathDurationDto(value, entry.getValue());
             }
        }
        return new PathDurationDto(minutes, "Minutes");
    }

}
