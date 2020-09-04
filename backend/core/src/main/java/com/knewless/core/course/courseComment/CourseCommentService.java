package com.knewless.core.course.courseComment;

import com.knewless.core.course.CourseRepository;
import com.knewless.core.course.courseComment.dto.CourseCommentDto;
import com.knewless.core.course.courseComment.dto.SaveCourseCommentRequest;
import com.knewless.core.course.courseComment.model.CourseComment;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.SourceType;
import com.knewless.core.messaging.MessageSender;
import com.knewless.core.messaging.userMessage.NotificationsMessage;
import com.knewless.core.messaging.userMessage.UserMessageType;
import com.knewless.core.notification.NotificationService;
import com.knewless.core.notification.dto.NotificationDto;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class CourseCommentService {
	private final CourseCommentRepository courseCommentRepository;
	private final CourseRepository courseRepository;
	private final UserRepository userRepository;
	private final MessageSender messageSender;
	private final NotificationService notificationService;
	
	@Autowired
	public CourseCommentService(CourseCommentRepository courseCommentRepository, CourseRepository courseRepository,
								UserRepository userRepository, MessageSender messageSender, NotificationService notificationService) {
		this.courseCommentRepository = courseCommentRepository;
		this.courseRepository = courseRepository;
		this.userRepository = userRepository;
		this.messageSender = messageSender;
		this.notificationService = notificationService;
	}
	
	public List<CourseComment> getCourseComments(UUID courseId, PageRequest pageRequest) {
		return courseCommentRepository.findAllByCourseId(courseId, pageRequest);
	}
	
	public CourseCommentDto save(SaveCourseCommentRequest request, UUID userId) {
		var courseComment = request.getId() == null ? new CourseComment()
				: courseCommentRepository.findById(request.getId()).orElseThrow();
		Course course = courseRepository.findById(request.getCourseId()).orElseThrow();
		courseComment.setCourse(course);
		courseComment.setText(request.getText());
		courseComment.setUser(userRepository.getOne(userId));
		CourseCommentDto courseCommentDto = CourseCommentMapper.MAPPER.commentToDto(courseCommentRepository.save(courseComment));
		sendToViewers(courseCommentDto);
		notifyAuthor(request, course.getAuthor().getUser().getId(), courseCommentDto);
		return courseCommentDto;
	}
	
	private void notifyAuthor(SaveCourseCommentRequest request, UUID authorUserId, CourseCommentDto courseCommentDto) {
		if (courseCommentDto.getUser().getId() != authorUserId) {
			String text = "Someone has commented on your course";
			NotificationDto notificationDto = NotificationDto.builder()
					.date(new Date()).isRead(false).sourceId(request.getCourseId().toString())
					.sourceType(SourceType.COURSE.toString()).text(text).build();
			notificationService.createAndSendNotification(notificationDto, authorUserId);
		}
	}
	
	private void sendToViewers(CourseCommentDto courseCommentDto) {
		messageSender.notifyUser(NotificationsMessage.builder()
				.receiverId(courseCommentDto.getCourseId().toString())
				.body(courseCommentDto)
				.type(UserMessageType.COURSE).build());
	}
}
