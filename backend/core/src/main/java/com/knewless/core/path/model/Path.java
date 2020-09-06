package com.knewless.core.path.model;

import com.knewless.core.author.model.Author;
import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseEntity;
import com.knewless.core.tag.model.Tag;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@Table(name = "paths")
public class Path extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "released_date")
    private Date releasedDate;

    @ManyToMany(cascade = {CascadeType.REFRESH, CascadeType.PERSIST})
    @JoinTable(name = "path_tag",
            joinColumns = @JoinColumn(name = "path_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags;

    /**
     * This tag is used to determine what image to display
     */
    @ManyToOne
    private Tag imageTag;

    @ManyToMany(cascade = {CascadeType.REFRESH, CascadeType.PERSIST})
    @JoinTable(name = "course_path",
            joinColumns = @JoinColumn(name = "path_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id"))
    private List<Course> courses = List.of();

    @ManyToOne
    private Author author;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Path path = (Path) o;
        return Objects.equals(name, path.name) &&
                Objects.equals(description, path.description) &&
                Objects.equals(author, path.author);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name, description, author);
    }
}
