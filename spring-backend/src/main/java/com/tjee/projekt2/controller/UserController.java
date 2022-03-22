package com.tjee.projekt2.controller;

import com.tjee.projekt2.dto.AuthResponse;
import com.tjee.projekt2.model.App;
import com.tjee.projekt2.model.User;
import com.tjee.projekt2.model.UserFiles;
import com.tjee.projekt2.security.TokenProvider;
import com.tjee.projekt2.service.user.UserService;
import com.tjee.projekt2.service.userFiles.UserFilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
public class UserController {

    UserService userService;
    UserFilesService userFilesService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    public UserController(UserService userService, UserFilesService userFilesService){
        this.userService = userService;
        this.userFilesService = userFilesService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public User registerAdmin(@RequestBody @Valid User user) {
        return userService.addAdmin(user);
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #id)")
    @DeleteMapping(value = "/{id}")
    public void deleteUser(@PathVariable long id){
        userService.deleteUserById(id);
    }

    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #user.id)")
    @PutMapping
    public User updateUser(@Valid @RequestBody User user){
        return userService.updateUser(user);
    }

    @GetMapping(value = "/{id}/apps")
    public Set<App> getUserApps(@PathVariable long id){
        return userService.getUserApps(id);
    }

    @PostMapping(value = "/{idUser}/addApp/{idApp}")
    public void addAppToUser(@PathVariable long idApp, @PathVariable long idUser){
        userService.addAppToUser(idApp, idUser);
    }

    @GetMapping(value = "/{id}/files")
    public Set<UserFiles> getUserFiles(@PathVariable long id) {
        return userFilesService.getUserFilesByUser(id);
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> generateToken(@RequestBody User loginUser) throws AuthenticationException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateToken(authentication);
        return ResponseEntity.ok(
                new AuthResponse(token, userService.getUserRolesByUsername(loginUser.getUsername()), userService.getUserByUsername(loginUser.getUsername()).getId())
        );
    }

    @RequestMapping(value="/register", method = RequestMethod.POST)
    public User saveUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable long id){
        return userService.getUserById(id);
    }

//
//    @GetMapping(value = "{id}/stats")
//    public Stats getUserStats(@PathVariable long id) {
//        return userService.getUserStats(id);
//    }
}
