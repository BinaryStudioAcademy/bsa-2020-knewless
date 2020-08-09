package com.knewless.core.lecture;

import com.knewless.core.fileManager.FileManager;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.messaging.Message;
import com.knewless.core.messaging.MessageSender;
import com.knewless.core.messaging.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LectureService {
    @Autowired
    private LectureRepository lectureRepository;
    @Autowired
    private FileManager fileManager;
    @Autowired
    private MessageSender messageSender;

    public void addLecture(String name, String description, byte[] file, String filename) {
        String folderId = fileManager.saveVideo(file, filename);

        Lecture lecture = new Lecture();
        lecture.setName(name);
        lecture.setDescription(description);
        Lecture savedLecture = lectureRepository.save(lecture);

        Message message = new Message();
        message.setEntityId(savedLecture.getId());
        message.setFolderId(folderId);
        message.setType(MessageType.REQUEST);

        messageSender.send(message);
    }
}
