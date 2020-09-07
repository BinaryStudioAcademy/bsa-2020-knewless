package com.knewless.core.lecture.dto;

import com.knewless.core.tag.dto.TagDto;
import lombok.Data;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
public class LectureUpdateDto {
    private UUID id;
    private String name;
    private String description;
    private String link;
    private String video;
    private Set<TagDto> tags;
    private int duration;
}
