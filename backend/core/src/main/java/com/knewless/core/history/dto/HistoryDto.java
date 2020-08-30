package com.knewless.core.history.dto;

import com.knewless.core.lecture.dto.LectureHistoryDto;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class HistoryDto {
    private UUID id;
    private int secondsWatched;
    private LectureHistoryDto lecture;
    private List<String> tags;
    private float fractionWatched;
    private Date updatedAt;
}
