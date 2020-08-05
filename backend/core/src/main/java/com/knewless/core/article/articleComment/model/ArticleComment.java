package com.knewless.core.article.articleComment.model;

import com.knewless.core.article.model.Article;
import com.knewless.core.db.BaseComment;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "article_comments")
public class ArticleComment extends BaseComment {
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "article_id")
    private Article article;
}
