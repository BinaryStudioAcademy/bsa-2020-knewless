package com.knewless.core.tag;

import com.knewless.core.tag.model.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
	
}
