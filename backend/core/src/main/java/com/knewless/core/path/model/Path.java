package com.knewless.core.path.model;

import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "paths")
public class Path extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

    @ManyToMany(mappedBy = "paths")
    private List<Course> courses = List.of();
}
