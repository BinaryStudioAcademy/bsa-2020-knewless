package com.knewless.core.article;

import com.knewless.core.article.dto.ArticleDto;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/article")
public class ArticleController {
    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    ArticleDto saveArticle(@RequestBody ArticleDto article, @CurrentUser UserPrincipal userPrincipal) {
        return articleService.saveArticle(article, userPrincipal.getId());
    }


}
