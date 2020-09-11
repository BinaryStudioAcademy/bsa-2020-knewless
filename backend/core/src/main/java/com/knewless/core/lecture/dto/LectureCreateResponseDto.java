package com.knewless.core.lecture.dto;

import com.knewless.core.tag.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LectureCreateResponseDto {
   private UUID id;
   private String lectureURL;
   private String name;
   private String description;
   private int timeSeconds;
   private List<UUID> tags;
}
