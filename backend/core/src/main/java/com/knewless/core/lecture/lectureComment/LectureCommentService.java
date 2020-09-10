package com.knewless.core.lecture.lectureComment;

import com.knewless.core.comments.CommentDto;
import com.knewless.core.comments.CommentService;
import com.knewless.core.comments.SaveCommentRequest;
import com.knewless.core.db.SourceType;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.lectureComment.model.LectureComment;
import com.knewless.core.lecture.model.Lecture;
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
public class LectureCommentService extends CommentService<LectureComment, Lecture> {
	private final LectureCommentRepository lectureCommentRepository;
	private final UserRepository userRepository;
	
	@Autowired
	public LectureCommentService(LectureCommentRepository lectureCommentRepository, LectureRepository lectureRepository,
								 UserRepository userRepository, MessageSender messageSender,
								 NotificationService notificationService) {
		super(messageSender, lectureCommentRepository, notificationService, lectureRepository);
		this.lectureCommentRepository = lectureCommentRepository;
		this.userRepository = userRepository;
	}
	
	public List<LectureComment> getCommentsOf(UUID lectureId, PageRequest pageRequest) {
		return lectureCommentRepository.findAllByLectureId(lectureId, pageRequest);
	}
	
	@Override
	protected CommentDto saveComment(@NotNull LectureComment comment, SaveCommentRequest saveRequest, UUID senderId, Lecture commentedLecture) {
		comment.setLecture(commentedLecture);
		comment.setText(saveRequest.getText());
		comment.setUser(userRepository.getOne(senderId));
		return LectureCommentMapper.MAPPER.commentToDto(lectureCommentRepository.save(comment));
	}
	
	@Override
	protected LectureComment newCommentInstance() {
		return new LectureComment();
	}
	
	@Override
	protected SourceType sourceType() {
		return SourceType.LECTURE;
	}
	
	@Override
	protected UserMessageType userMessageType() {
		return UserMessageType.LECTURE;
	}
	
	@Override
	protected String notificationMessage() {
		return "Someone has commented on your lecture";
	}
}
