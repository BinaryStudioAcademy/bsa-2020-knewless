package com.knewless.core.article.articleComment;

import com.knewless.core.article.ArticleRepository;
import com.knewless.core.article.articleComment.dto.ArticleCommentDto;
import com.knewless.core.article.articleComment.model.ArticleComment;
import com.knewless.core.article.model.Article;
import com.knewless.core.comments.*;
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
public class ArticleCommentService extends CommentService<ArticleComment, Article> {
	private final ArticleCommentRepository repository;
	private final UserRepository userRepository;
	
	@Autowired
	protected ArticleCommentService(MessageSender messageSender, ArticleCommentRepository articleCommentRepository,
									NotificationService notificationService, ArticleRepository articleRepository, UserRepository userRepository) {
		super(messageSender, articleCommentRepository, notificationService, articleRepository);
		this.repository = articleCommentRepository;
		this.userRepository = userRepository;
	}
	
	@Override
	public List<ArticleComment> getCommentsOf(UUID sourceId, PageRequest pageRequest) {
		return repository.findAllByArticleId(sourceId, pageRequest);
	}
	
	@Override
	protected ArticleCommentDto saveComment(@NotNull ArticleComment comment, SaveCommentRequest saveRequest, UUID senderId, Article commentableEntity) {
		comment.setArticle(commentableEntity);
		comment.setText(saveRequest.getText());
		comment.setUser(userRepository.getOne(senderId));
		return ArticleCommentMapper.INSTANCE.commentToDto(repository.save(comment));
	}
	
	@Override
	protected ArticleComment newCommentInstance() {
		return new ArticleComment();
	}
	
	@Override
	protected SourceType sourceType() {
		return SourceType.ARTICLE;
	}
	
	@Override
	protected UserMessageType userMessageType() {
		return UserMessageType.ARTICLE;
	}
	
	@Override
	protected String notificationMessage() {
		return "Someone has commented on your article!";
	}
}
