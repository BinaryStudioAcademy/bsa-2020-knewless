package com.knewless.core.lecture.mapper;

import com.knewless.core.lecture.dto.LectureDto;
import com.knewless.core.lecture.dto.LectureToPlayerDto;

import java.util.UUID;

public class LectureProjectionMapper {
    public LectureDto fromProjection(LectureToPlayerDto lecture, String url){
        LectureDto result = new LectureDto();
        result.setId(UUID.fromString(lecture.getId()));
        result.setName(lecture.getName());
        result.setDescription(lecture.getDescription());
        result.setDuration(lecture.getDuration());
        result.setWebLink(lecture.getWebLink());
        if(lecture.getUrlOrigin()!=null)
        {
            result.setUrlOrigin(url+lecture.getUrlOrigin());
            if(lecture.getUrl1080()!=null) result.setUrl1080(url+lecture.getUrl1080());
            if(lecture.getUrl720()!=null) result.setUrl720(url+lecture.getUrl720());
            if(lecture.getUrl480()!=null) result.setUrl480(url+lecture.getUrl480());
        }
        return result;
    }
}
