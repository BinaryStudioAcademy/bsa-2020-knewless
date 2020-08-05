package com.knewless.core.school.model;

import com.knewless.core.db.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "schools")
public class School extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "logo")
    private String logo;

    @Column(name = "description")
    private String description;
}
