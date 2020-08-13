package com.knewless.core.tag.model;

import com.knewless.core.article.model.Article;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.lecture.model.Lecture;
import com.knewless.core.path.model.Path;
import com.knewless.core.user.model.User;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "tags")
public class Tag extends BaseEntity {
	@Column(name = "name")
	private String name;
	
	@Column(name = "source")
	private String source;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinTable(name = "user_tag",
			joinColumns = @JoinColumn(name = "tag_id"),
			inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> users = Set.of();
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinTable(name = "article_tag",
			joinColumns = @JoinColumn(name = "tag_id"),
			inverseJoinColumns = @JoinColumn(name = "article_id"))
	private Set<Article> articles = Set.of();
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
	@JoinTable(name = "lecture_tag",
			joinColumns = @JoinColumn(name = "tag_id"),
			inverseJoinColumns = @JoinColumn(name = "lecture_id"))
	private Set<Lecture> lectures = Set.of();
	
	@ManyToMany(mappedBy = "tags", cascade = {CascadeType.REFRESH, CascadeType.PERSIST})
	private Set<Path> paths = Set.of();
}
