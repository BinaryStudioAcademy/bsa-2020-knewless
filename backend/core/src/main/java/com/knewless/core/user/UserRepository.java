package com.knewless.core.user;

import com.knewless.core.user.model.User;
import com.knewless.core.user.role.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("select u.role from User u where u.email = :email")
    Role getUserRoleId(@Param("email") String email);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.role.id = :roleId WHERE u.id = :id")
    void setRole(@Param("id") UUID userId, @Param("roleId") UUID roleId);


    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.password = :password WHERE u.id = :id")
    void setPassword(@Param("id") UUID userId, @Param("password") String password);

}
