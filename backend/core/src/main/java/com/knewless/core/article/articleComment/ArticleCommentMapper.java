package com.knewless.core.article.articleComment;

import com.knewless.core.article.articleComment.dto.ArticleCommentDto;
import com.knewless.core.article.articleComment.model.ArticleComment;
import com.knewless.core.user.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(uses = UserMapper.class)
public interface ArticleCommentMapper {
	ArticleCommentMapper INSTANCE = Mappers.getMapper(ArticleCommentMapper.class);
	
	@Mapping(source = "article.id", target = "articleId")
	ArticleCommentDto commentToDto(ArticleComment comment);
}
