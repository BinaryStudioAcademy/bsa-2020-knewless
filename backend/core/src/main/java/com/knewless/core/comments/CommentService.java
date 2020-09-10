package com.knewless.core.comments;

import com.knewless.core.db.BaseComment;
import com.knewless.core.db.SourceType;
import com.knewless.core.messaging.MessageSender;
import com.knewless.core.messaging.userMessage.NotificationsMessage;
import com.knewless.core.messaging.userMessage.UserMessageType;
import com.knewless.core.notification.NotificationService;
import com.knewless.core.notification.dto.NotificationDto;
import org.springframework.data.domain.PageRequest;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public abstract class CommentService<T extends BaseComment, U extends CommentableEntity> {
	private final MessageSender messageSender;
	private final CommentRepository<T> commentRepository;
	private final NotificationService notificationService;
	private final CommentSourceRepository<U> commentSourceRepository;
	
	protected CommentService(MessageSender messageSender, CommentRepository<T> commentRepository,
							 NotificationService notificationService, CommentSourceRepository<U> commentSourceRepository) {
		this.messageSender = messageSender;
		this.commentRepository = commentRepository;
		this.notificationService = notificationService;
		this.commentSourceRepository = commentSourceRepository;
	}
	
	public CommentDto save(SaveCommentRequest request, UUID userId) {
		T comment = request.getId() == null ? newCommentInstance()
				: commentRepository.findById(request.getId()).orElseThrow();
		U commentableEntity = commentSourceRepository.findSourceById(request.getSourceId()).orElseThrow();
		UUID authorId = commentableEntity.getNotifiedUserId();
		CommentDto savedComment = saveComment(comment, request, userId, commentableEntity);
		sendToViewers(savedComment);
		notifyAuthor(request, authorId, savedComment);
		return savedComment;
	}
	
	public abstract List<T> getCommentsOf(UUID sourceId, PageRequest pageRequest);
	
	protected void notifyAuthor(SaveCommentRequest request, UUID authorUserId, CommentDto commentDto) {
		if (commentDto.getUser().getId() != authorUserId) {
			NotificationDto notificationDto = NotificationDto.builder()
					.date(new Date()).isRead(false).sourceId(request.getSourceId().toString())
					.sourceType(sourceType().toString()).text(notificationMessage()).build();
			notificationService.createAndSendNotification(notificationDto, authorUserId);
		}
	}
	
	protected void sendToViewers(CommentDto commentDto) {
		messageSender.notifyUser(NotificationsMessage.builder()
				.receiverId(commentDto.getSourceId().toString())
				.body(commentDto)
				.type(userMessageType()).build());
	}
	
	/**
	 * @param comment           either new comment or saved before
	 * @param saveRequest       the request containing info needed to save the comment
	 * @param senderId          the id of the sender
	 * @param commentableEntity which is being commented
	 * @return saved entity converted into dto
	 */
	protected abstract CommentDto saveComment(@NotNull T comment, SaveCommentRequest saveRequest, UUID senderId, U commentableEntity);
	
	protected abstract T newCommentInstance();
	
	protected abstract SourceType sourceType();
	
	protected abstract UserMessageType userMessageType();
	
	protected abstract String notificationMessage();
}
