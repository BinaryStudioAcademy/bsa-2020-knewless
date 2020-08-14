package com.knewless.core.user.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {
    private UUID id;
    private String email;
    private String nickname;
    private RoleDto role;
    private String avatar;
}
