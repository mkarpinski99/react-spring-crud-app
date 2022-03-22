package com.tjee.projekt2.service.user;

import com.tjee.projekt2.model.App;
import com.tjee.projekt2.model.Role;
import com.tjee.projekt2.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    User addUser(User user);
    User getUserById(long id);
    User updateUser(User user);
    void deleteUser(User user);
    List<User> getAllUsers();
    Set<App> getUserApps(long id);
    void deleteUserById(long id);
    void addAppToUser(long idApp, long idUser);
    User addAdmin(User user);
    Set<Role> getUserRolesByUsername(String username);
    User getUserByUsername(String username);
}
