package com.knewless.core.user.role.model;

import com.knewless.core.db.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "roles")
public class Role extends BaseEntity {
    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private RoleType name;
}
