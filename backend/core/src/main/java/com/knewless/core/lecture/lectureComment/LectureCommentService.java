package com.knewless.core.lecture.lectureComment;

import com.knewless.core.course.courseComment.model.CourseComment;
import com.knewless.core.db.SourceType;
import com.knewless.core.lecture.LectureRepository;
import com.knewless.core.lecture.lectureComment.dto.LectureCommentDto;
import com.knewless.core.lecture.lectureComment.dto.SaveLectureCommentRequest;
import com.knewless.core.lecture.lectureComment.model.LectureComment;
import com.knewless.core.lecture.model.Lecture;
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
public class LectureCommentService {
	private final LectureCommentRepository lectureCommentRepository;
	private final LectureRepository lectureRepository;
	private final UserRepository userRepository;
	private final MessageSender messageSender;
	private final NotificationService notificationService;
	
	@Autowired
	public LectureCommentService(LectureCommentRepository lectureCommentRepository, LectureRepository lectureRepository, UserRepository userRepository, MessageSender messageSender, NotificationService notificationService) {
		this.lectureCommentRepository = lectureCommentRepository;
		this.lectureRepository = lectureRepository;
		this.userRepository = userRepository;
		this.messageSender = messageSender;
		this.notificationService = notificationService;
	}
	
	public List<LectureComment> getCourseComments(UUID lectureId, PageRequest pageRequest) {
		return lectureCommentRepository.findAllByLectureId(lectureId, pageRequest);
	}
	
	public LectureCommentDto save(SaveLectureCommentRequest request, UUID userId) {
		var lectureComment = request.getId() == null ? new LectureComment()
				: lectureCommentRepository.findById(request.getId()).orElseThrow();
		Lecture lecture = lectureRepository.findById(request.getLectureId()).orElseThrow();
		lectureComment.setLecture(lecture);
		lectureComment.setText(request.getText());
		lectureComment.setUser(userRepository.getOne(userId));
		LectureCommentDto lectureCommentDto = LectureCommentMapper.MAPPER.commentToDto(lectureCommentRepository.save(lectureComment));
		sendToViewers(lectureCommentDto);
		notifyAuthor(request, lecture.getUser().getId(), lectureCommentDto);
		return lectureCommentDto;
	}
	
	private void notifyAuthor(SaveLectureCommentRequest request, UUID authorUserId, LectureCommentDto lectureCommentDto) {
		if (lectureCommentDto.getUser().getId() != authorUserId) {
			String text = "Someone has commented on your lecture";
			NotificationDto notificationDto = NotificationDto.builder()
					.date(new Date()).isRead(false).sourceId(request.getLectureId().toString())
					.sourceType(SourceType.LECTURE.toString()).text(text).build();
			notificationService.createAndSendNotification(notificationDto, authorUserId);
		}
	}
	
	private void sendToViewers(LectureCommentDto lectureCommentDto) {
		messageSender.notifyUser(NotificationsMessage.builder()
				.receiverId(lectureCommentDto.getLectureId().toString())
				.body(lectureCommentDto)
				.type(UserMessageType.LECTURE).build());
	}
}
