package com.knewless.core.lecture.Dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Builder
@Data
public class FavouriteLectureResponseDto {
    private UUID id;
    private String name;
    private String course;
    private String author;
    private int duration;
    private int rating;
    private String image;
}
