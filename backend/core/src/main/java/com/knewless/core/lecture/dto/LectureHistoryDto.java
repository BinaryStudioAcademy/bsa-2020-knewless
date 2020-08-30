package com.knewless.core.lecture.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class LectureHistoryDto {
    private UUID id;
    private String name;
    private String previewImage;
    private int duration;
}
