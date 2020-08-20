package com.knewless.core.user;

import com.knewless.core.author.AuthorRepository;
import com.knewless.core.exception.custom.ResourceNotFoundException;
import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.student.StudentRepository;
import com.knewless.core.user.dto.UserDto;
import com.knewless.core.user.model.User;
import com.knewless.core.user.role.RoleRepository;
import com.knewless.core.user.role.model.Role;
import com.knewless.core.user.role.model.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email : " + email));
        return UserPrincipal.create(user);
    }

    @Transactional
    public UserDetails loadUserById(UUID id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", id)
        );

        return UserPrincipal.create(user);
    }

    public UserDto findById(UUID id) {
        var user = userRepository.findById(id)
                 .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        var userDto = UserMapper.MAPPER.userToUserDto(user);

        if(userDto.getRole() == null) {
            userDto.setAvatar(null);
        } else if(userDto.getRole().getName().equals(RoleType.AUTHOR)) {
            var author = authorRepository.findByUserId(id);
            author.ifPresent(value -> userDto.setAvatar(value.getAvatar()));
        } else if(userDto.getRole().getName().equals(RoleType.USER)) {
            var student = studentRepository.findByUserId(id);
            student.ifPresent(value -> userDto.setAvatar(value.getAvatar()));
        }
        return userDto;
    }

    public void setRole(UUID userId, RoleType roleType) {
        if (!userRepository.existsByIdAndRoleIsNotNull(userId)) {
            var role = roleRepository.findByName(roleType);
            userRepository.setRole(userId, role.getId());
        }
    }

    public Role getUserRole(String email) {
        return userRepository.getUserRoleId(email);
    }

    public Role getUserRole(String email) {
        return userRepository.getUserRoleId(email);
    }
}
