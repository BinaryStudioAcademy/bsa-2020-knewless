package com.knewless.core.user;

import com.knewless.core.user.dto.UserDto;
import com.knewless.core.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "avatar", ignore = true)
    public UserDto userToUserDto(User user);
}
