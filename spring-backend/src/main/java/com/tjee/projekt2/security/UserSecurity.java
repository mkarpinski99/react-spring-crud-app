package com.tjee.projekt2.security;

import com.tjee.projekt2.model.User;
import com.tjee.projekt2.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("userSecurity")
public class UserSecurity {

    @Autowired
    UserService userService;

    public boolean hasUserId(Authentication authentication, Long userId) {
        User user = userService.getUserById(userId);
        return authentication.getName().equals(user.getUsername());
    }
}
