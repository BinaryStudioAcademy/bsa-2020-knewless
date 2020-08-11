package com.knewless.core.course;

import com.knewless.core.course.dto.*;
import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.model.Author;
import com.knewless.core.course.model.Course;
import com.knewless.core.course.model.Level;
import com.knewless.core.lecture.Dto.ShortLectureDto;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.homework.HomeworkRepository;
import com.knewless.core.lecture.homework.model.Homework;
import com.knewless.core.lecture.model.Lecture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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
        allLectures.stream().forEach(lec-> {
            if(!result.stream().map(l -> l.getSourceUrl()).collect(Collectors.toList()).contains(lec.getSourceUrl())) {
               result.add(lec);
            }
        });
        return result.stream()
                .map(l-> new ShortLectureDto(l.getId(), l.getName(), l.getDescription(), l.getDuration()))
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
                .name(request.getName()).description(request.getDescription()).build();
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
            if (!ophw.isEmpty()) l.setHomework(ophw.get());
        });
        lectureRepository.saveAll(thisLectures);
        return new CreateCourseResponseDto(course.getId(), true);
    }

    public CourseToPlayerProjection getCourseByLectureId(UUID lectureId) {
        return courseRepository.findOneById(UUID.fromString(courseRepository.findByLectureId(lectureId).getId()));
    }

    List<CourseDto> getRecommendedCourses(UUID id) {
        return courseRepository.findRecommendedCoursesId(PageRequest.of(0, 10))
                .stream()
                .map(this::getCourseById)
                .collect(Collectors.toList());
    }

    public CourseDto getCourseById(UUID id) {
        var result = courseRepository.getCourseById(id);
        var course = CourseMapper.MAPPER.courseQueryResultToCourseDto(result);

        course.setRating(result.getAllReactions() == 0
                ? 0
                : Math.round((float) result.getPositiveReactions() /
                result.getAllReactions() * 5));
        course.setLevel(result.getLevel().name());
        course.setDuration(getDuration(result.getDuration()));
        return course;
    }

    public String getDuration(long minutes) {
        long hh = minutes / 60;
        long mm = minutes % 60;
        return String.format("%dh %02dm", hh, mm);
    }

    public List<AuthorCourseDto> getCoursesByAuthorId(UUID authorId) {
        return courseRepository.getCoursesByAuthorId(authorId).stream()
                .map(CourseMapper.MAPPER::authorCourseQueryResultToAuthorCourseDto)
                .collect(Collectors.toUnmodifiableList());
    }

}
