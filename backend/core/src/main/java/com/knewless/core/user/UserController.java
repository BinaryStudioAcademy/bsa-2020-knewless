package com.knewless.core.user;

import com.knewless.core.security.oauth.UserPrincipal;
import com.knewless.core.user.dto.RoleDto;
import com.knewless.core.user.dto.UserDto;
import com.knewless.core.user.model.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/me")
    public UserDto getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userService.findById(userPrincipal.getId());
    }

    @PutMapping("user/me/role")
    public void setRole(@CurrentUser UserPrincipal userPrincipal,
                        @RequestBody RoleDto role) {
        userService.setRole(userPrincipal.getId(), role.getName());
    }
}
