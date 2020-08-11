package com.knewless.core.lecture.dto;

import lombok.Data;

public interface LectureToPlayerDto {
    String getId();
    String getSourceUrl();
    String getDescription();
    int getDuration();
}
