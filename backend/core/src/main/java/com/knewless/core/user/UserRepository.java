package com.knewless.core.user;

import com.knewless.core.user.model.User;
import com.knewless.core.user.role.model.Role;
import com.knewless.core.user.role.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
}
