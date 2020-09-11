package com.knewless.core.lecture;

import com.knewless.core.comments.CommentSourceRepository;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.SourceType;
import com.knewless.core.lecture.dto.ShortLectureDto;
import com.knewless.core.lecture.model.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LectureRepository extends CommentSourceRepository<Lecture>, JpaRepository<Lecture, UUID> {

	List<Lecture> getAllByUserId(UUID userId);

	@Transactional
	@Modifying
	@Query("UPDATE Lecture l " +
			"SET l.duration = :duration, l.urlOrigin = :path " +
			"WHERE l.id = :id")
	void setDurationPath(@Param("id") UUID id, @Param("duration") int duration, @Param("path") String path);

	@Query("SELECT l FROM Lecture l " +
			"INNER JOIN Favorite f ON f.sourceId = l.id " +
			"WHERE f.sourceType = :type AND f.user.id = :userId")
	List<Lecture> getFavouriteLecturesByUserId(@Param("userId") UUID userId, @Param("type") SourceType type);

	long countAllByCourse_Id(UUID courseId);

	@Override
	default Optional<Lecture> findSourceById(UUID sourceId) {
		return findById(sourceId);
	}
}
