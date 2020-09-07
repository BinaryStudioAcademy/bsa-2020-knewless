package com.knewless.core.lecture.mapper;

import com.knewless.core.lecture.dto.LectureDto;
import com.knewless.core.lecture.dto.LectureToPlayerDto;
import com.knewless.core.lecture.dto.LectureUpdateDto;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.tag.TagMapper;

import java.util.UUID;
import java.util.stream.Collectors;

public class LectureEditMapper {
    public static LectureUpdateDto fromEntity(Lecture lecture){
        LectureUpdateDto result = new LectureUpdateDto();
        result.setId(lecture.getId());
        result.setName(lecture.getName());
        result.setDescription(lecture.getDescription());
        result.setLink(lecture.getWebLink());
        result.setDuration(lecture.getDuration());
        if(lecture.getUrlOrigin()!=null) {
            result.setVideo(lecture.getUrlOrigin().substring(lecture.getUrlOrigin().lastIndexOf('/')+1));
        }
        result.setTags(lecture.getTags()
                .stream()
                .map(TagMapper.INSTANCE::tagToDto)
                .collect(Collectors.toSet()));
        return result;
    }
}
