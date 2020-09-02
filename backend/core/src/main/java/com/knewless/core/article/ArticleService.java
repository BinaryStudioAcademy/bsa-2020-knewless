package com.knewless.core.article;

import com.knewless.core.article.dto.ArticleDto;
import com.knewless.core.article.mapper.ArticleMapper;
import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.model.Author;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final AuthorRepository authorRepository;

    public ArticleService(ArticleRepository articleRepository, AuthorRepository authorRepository) {
        this.articleRepository = articleRepository;
        this.authorRepository = authorRepository;
    }

    public ArticleDto saveArticle(ArticleDto article, UUID userId) {
        Author author = authorRepository.findByUserId(userId).orElseThrow();
        return ArticleMapper.fromEntinty(articleRepository.save(ArticleMapper.fromDto(article, author)));

    }
}
