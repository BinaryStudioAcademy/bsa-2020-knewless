package com.knewless.core.lecture.dto;

import lombok.Data;

public interface LectureToPlayerDto {
    String getId();
    String getName();
    String getWebLink();
    String getUrlOrigin();
    String getUrl1080();
    String getUrl720();
    String getUrl480();
    String getDescription();
    int getDuration();
}
