package com.knewless.core.tag;

import com.knewless.core.tag.dto.TagDto;
import com.knewless.core.tag.model.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TagMapper {
	TagMapper INSTANCE = Mappers.getMapper(TagMapper.class);
	
	@Mapping(source = "source", target = "imageSrc")
	TagDto tagToDto(Tag tag);
}
