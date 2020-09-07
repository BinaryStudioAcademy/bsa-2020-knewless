package com.knewless.core.lecture.mapper;

import com.knewless.core.lecture.dto.LectureDto;
import com.knewless.core.lecture.dto.LectureToPlayerDto;

import java.util.UUID;

public class LectureProjectionMapper {
	public LectureDto fromProjection(LectureToPlayerDto lecture, String url) {
		var lectureDto = new LectureDto();
		lectureDto.setId(UUID.fromString(lecture.getId()));
		lectureDto.setName(lecture.getName());
		lectureDto.setDescription(lecture.getDescription());
		lectureDto.setDuration(lecture.getDuration());
		lectureDto.setWebLink(lecture.getWebLink());
		if (lecture.getPreviewImage() != null) {
			lectureDto.setPreviewImage(url + lecture.getPreviewImage());
		}
		if (lecture.getUrlOrigin() != null) {
			lectureDto.setUrlOrigin(url + lecture.getUrlOrigin());
			if (lecture.getUrl1080() != null) lectureDto.setUrl1080(url + lecture.getUrl1080());
			if (lecture.getUrl720() != null) lectureDto.setUrl720(url + lecture.getUrl720());
			if (lecture.getUrl480() != null) lectureDto.setUrl480(url + lecture.getUrl480());
		}
		return lectureDto;
	}
}
