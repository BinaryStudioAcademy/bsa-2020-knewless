package com.knewless.core.user.role;

import com.knewless.core.user.role.model.Role;
import com.knewless.core.user.role.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {

    Role findByName(RoleType name);
}
