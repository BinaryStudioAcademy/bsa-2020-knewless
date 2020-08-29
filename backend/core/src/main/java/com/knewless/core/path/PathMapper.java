package com.knewless.core.path;

import com.knewless.core.author.model.Author;
import com.knewless.core.course.model.Course;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.dto.*;
import com.knewless.core.path.model.Path;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface PathMapper {
    PathMapper MAPPER = Mappers.getMapper(PathMapper.class);

    @Mapping(source = "seconds", target = "duration")
    @Mapping(target = "logoSrc", source = "image")
    PathDto pathQueryResultToPathDto(PathQueryResult pathQueryResult);

    @Mapping(source = "seconds", target = "duration")
    @Mapping(target = "logoSrc", source = "image")
    AuthorPathDto authorPathQueryResultToAuthorPathDto(AuthorPathQueryResult pathQueryResult);

    @Mapping(target = "courses", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "duration", ignore = true)
    @Mapping(target = "imageTag.imageSrc", source = "imageTag.source")
    PathDetailsDto pathToPathDetailsDto(Path path);

    @Mapping(target = "courses", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "duration", ignore = true)
    PathPageDto pathToPathPageDto(Path path);
    @Mapping(target="authorId", expression = "java(path.getAuthor().getId())")
    @Mapping(target="author", expression = "java(path.getAuthor().getFullName())")
    @Mapping(target = "duration", expression = "java(PathMapper.getPathDuration(path))")
    @Mapping(target="image", expression = "java(path.getImageTag().getSource())")
    @Mapping(target="courses", expression = "java(path.getCourses().size())")
    FavouritePathResponseDto pathToFavouritePathResponseDto(Path path);

    static int getPathDuration(Path path) {
        List<Course> courses = path.getCourses();
        int result = 0;
        for (Course c: courses) {
            for (Lecture l: c.getLectures()) {
                result += l.getDuration();
            }
        }
        return result;
    }
}
