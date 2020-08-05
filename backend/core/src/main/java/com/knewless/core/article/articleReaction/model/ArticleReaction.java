package com.knewless.core.article.articleReaction.model;

import com.knewless.core.article.model.Article;
import com.knewless.core.db.BaseReaction;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "article_reactions")
public class ArticleReaction extends BaseReaction {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "article_id")
    private Article article;
}
