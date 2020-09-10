package com.knewless.core.course.courseComment;

import com.knewless.core.comments.CommentDto;
import com.knewless.core.comments.CommentService;
import com.knewless.core.comments.SaveCommentRequest;
import com.knewless.core.course.CourseRepository;
import com.knewless.core.course.courseComment.model.CourseComment;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.SourceType;
import com.knewless.core.messaging.MessageSender;
import com.knewless.core.messaging.userMessage.UserMessageType;
import com.knewless.core.notification.NotificationService;
import com.knewless.core.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

@Service
public class CourseCommentService extends CommentService<CourseComment, Course> {
	private final CourseCommentRepository courseCommentRepository;
	private final UserRepository userRepository;
	
	@Autowired
	public CourseCommentService(CourseCommentRepository courseCommentRepository, CourseRepository courseRepository,
								UserRepository userRepository, MessageSender messageSender, NotificationService notificationService) {
		super(messageSender, courseCommentRepository, notificationService, courseRepository);
		this.courseCommentRepository = courseCommentRepository;
		this.userRepository = userRepository;
	}
	
	@Override
	public List<CourseComment> getCommentsOf(UUID courseId, PageRequest pageRequest) {
		return courseCommentRepository.findAllByCourseId(courseId, pageRequest);
	}
	
	@Override
	protected CommentDto saveComment(@NotNull CourseComment comment, SaveCommentRequest saveRequest, UUID senderId, Course commentableEntity) {
		comment.setCourse(commentableEntity);
		comment.setText(saveRequest.getText());
		comment.setUser(userRepository.getOne(senderId));
		return CourseCommentMapper.MAPPER.commentToDto(courseCommentRepository.save(comment));
	}
	
	@Override
	protected CourseComment newCommentInstance() {
		return new CourseComment();
	}
	
	@Override
	protected SourceType sourceType() {
		return SourceType.COURSE;
	}
	
	@Override
	protected UserMessageType userMessageType() {
		return UserMessageType.COURSE;
	}
	
	@Override
	protected String notificationMessage() {
		return "Someone has commented on your course";
	}
}
