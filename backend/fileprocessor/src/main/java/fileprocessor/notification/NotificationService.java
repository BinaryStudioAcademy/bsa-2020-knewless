package fileprocessor.notification;

import fileprocessor.db.SourceType;
import fileprocessor.notification.model.Notification;
import fileprocessor.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class NotificationService {
	@Autowired
	private NotificationRepository notificationRepository;
	
	public Notification saveLectureNotification(UUID lectureId, String lectureName, UUID userId) {
		User user = new User();
		user.setId(userId);
		Notification notification = new Notification();
		notification.setUser(user);
		notification.setText("Lecture " + lectureName + " processed");
		notification.setRead(false);
		notification.setSourceId(lectureId);
		notification.setSourceType(SourceType.LECTURE);
		
		return notificationRepository.save(notification);
	}
}
