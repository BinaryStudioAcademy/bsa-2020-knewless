package com.knewless.core.tag;

import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.tag.dto.TagDto;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("tags")
public class TagController {
	private final TagService tagService;
	
	@Autowired
	public TagController(TagService tagService) {
		this.tagService = tagService;
	}
	
	@GetMapping
	public List<TagDto> getAll() {
		return tagService.getAll().stream().map(TagMapper.INSTANCE::tagToDto).collect(Collectors.toList());
	}
	
	@GetMapping("user")
	public List<TagDto> studentTags(@CurrentUser UserPrincipal userPrincipal) {
		return tagService.getByUserId(userPrincipal.getId());
	}
}
