package com.knewless.core.article.model;

import com.knewless.core.article.articleComment.model.ArticleComment;
import com.knewless.core.article.articleReaction.model.ArticleReaction;
import com.knewless.core.author.model.Author;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.tag.model.Tag;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "articles")
public class Article extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @Column(name = "text", columnDefinition = "TEXT")
    private String text;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "author_id")
    private Author author;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ArticleComment> comments = List.of();

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ArticleReaction> reactions = List.of();

    @ManyToMany(mappedBy = "articles")
    private Set<Tag> tags = Set.of();
}
