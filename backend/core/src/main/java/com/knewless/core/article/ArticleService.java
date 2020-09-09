package com.knewless.core.article;

import com.knewless.core.article.dto.ArticleDto;
import com.knewless.core.article.dto.ArticleFullDto;
import com.knewless.core.article.dto.FavouriteArticleDto;
import com.knewless.core.article.mapper.ArticleMapper;
import com.knewless.core.article.model.Article;
import com.knewless.core.author.AuthorRepository;
import com.knewless.core.author.model.Author;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.security.oauth.UserPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final AuthorRepository authorRepository;

    public ArticleService(ArticleRepository articleRepository, AuthorRepository authorRepository) {
        this.articleRepository = articleRepository;
        this.authorRepository = authorRepository;
    }

    public ArticleDto saveArticle(ArticleDto article, UUID userId) {
        if (article.getId()!= null){
            Article articleEdit = articleRepository.findById(article.getId()).orElseThrow();
            articleEdit.setImage(article.getImage());
            articleEdit.setName(article.getName());
            articleEdit.setText(article.getText());
            return ArticleMapper.fromEntinty(articleRepository.save(articleEdit));
        }
        Author author = authorRepository.findByUserId(userId).orElseThrow();
        return ArticleMapper.fromEntinty(articleRepository.save(ArticleMapper.fromDto(article, author)));
    }

    public ArticleFullDto getArticle(UUID articleId) {
        final var article = ArticleMapper.fromEntintyToFull(
                this.articleRepository.findById(articleId).orElseThrow()
        );
        article.getAuthor()
                .setArticles(this.articleRepository.getArticlesByAuthorId(article.getAuthor().getId()).stream()
                        .map(ArticleMapper::fromEntinty)
                        .collect(Collectors.toList()));
        article.setFavourite(this.articleRepository.getIsFavouriteById(articleId));
        return article;
    }

    public List<FavouriteArticleDto> getFavouriteArticlesByUserId(UUID userId) {
        return this.articleRepository.getFavouriteArticlesByUserId(userId).stream()
                .map(a -> new FavouriteArticleDto(a.getId(), a.getName(), a.getImage(), a.getAuthor().getFullName(),
                        calculateReadingTimeInMinutes(a.getText()))
                )
                .collect(Collectors.toUnmodifiableList());
    }

    private int calculateReadingTimeInMinutes(String text) {
        float wordsPerMinute = 200.0f;
        int numberOfWords = text.split("\\s").length;
        double minutes = numberOfWords / wordsPerMinute;
        return (int) Math.max(1, Math.ceil(minutes));
    }

    public List<ArticleDto> getArticles(UserPrincipal user) {
        Author author = authorRepository.findByUserId(user.getId()).orElseThrow();
        return articleRepository.getArticlesByAuthorId(author.getId())
                .stream()
                .map( ArticleMapper::fromEntinty)
                .collect(Collectors.toList());
    }

    public ArticleDto getArticleEdit(UUID id, UserPrincipal user) {
        Author author = authorRepository.findByUserId(user.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Author", "userId", user.getId())
        );
        Article article = articleRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Article", "id", id)
        );
        if (!author.getId().equals(article.getAuthor().getId())) {
            throw new ResourceNotFoundException("Author", "userId", user.getId());
        }
        return ArticleMapper.fromEntinty(article);
    }

}
