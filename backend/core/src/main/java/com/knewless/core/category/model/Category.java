package com.knewless.core.category.model;

import com.knewless.core.course.model.Course;
import com.knewless.core.db.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "categories")
public class Category extends BaseEntity {
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Course> courses = List.of();
}
