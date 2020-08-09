package fileprocessor.lecture.model;


import fileprocessor.db.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "lectures")
public class Lecture extends BaseEntity {
    @Column(name = "source_url")
    private String sourceUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "duration")
    private int duration;
}
