package com.knewless.core.tag;

import com.knewless.core.tag.dto.TagDto;
import com.knewless.core.tag.model.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TagService {
	private final TagRepository tagRepository;
	
	@Autowired
	public TagService(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}
	
	public List<Tag> getAll() {
		return tagRepository.findAll();
	}

	public List<TagDto> getByLectureId(UUID lectureId) {
		return tagRepository.findByLectureId(lectureId)
				.stream()
				.map(TagMapper.INSTANCE::tagToDto)
				.collect(Collectors.toList());
	}
	
}
