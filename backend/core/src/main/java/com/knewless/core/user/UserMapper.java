package com.knewless.core.user;

import com.knewless.core.user.dto.BriefUserDto;
import com.knewless.core.user.dto.UserDto;
import com.knewless.core.user.model.User;
import com.knewless.core.user.role.model.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "avatar", ignore = true)
    UserDto userToUserDto(User user);
    
    @Mapping(target = "username", source = "user.nickname")
    @Mapping(target = "role", source = "user.role.name")
    BriefUserDto userToBriefDto(User user);
    
    @SuppressWarnings("unused")
    default String roleToString(Role role) {
        return role.toString();
    }
}
