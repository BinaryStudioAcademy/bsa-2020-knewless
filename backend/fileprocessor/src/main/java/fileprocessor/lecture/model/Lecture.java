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
    @Column(name = "web_link")
    private String webLink;

    @Column(name = "url_origin")
    private String urlOrigin;

    @Column(name = "url_1080")
    private String url1080;

    @Column(name = "url_720")
    private String url720;

    @Column(name = "url_480")
    private String url480;

    @Column(name = "preview_image")
    private String previewImage;

    @Column(name = "description")
    private String description;

    @Column(name = "duration")
    private int duration;
}
