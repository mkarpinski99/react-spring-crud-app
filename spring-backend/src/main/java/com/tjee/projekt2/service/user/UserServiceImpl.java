package com.tjee.projekt2.service.user;

import com.tjee.projekt2.model.App;
import com.tjee.projekt2.model.Role;
import com.tjee.projekt2.model.User;
import com.tjee.projekt2.repository.AppRepository;
import com.tjee.projekt2.repository.UserRepository;
import com.tjee.projekt2.service.role.RoleService;
import com.tjee.projekt2.service.role.RoleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service("userService")
public class UserServiceImpl implements UserService, UserDetailsService {

    UserRepository userRepository;
    AppRepository appRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private RoleService roleService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, AppRepository appRepository){
        this.userRepository = userRepository;
        this.appRepository = appRepository;
    }

    public User addUser(User user){
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        Role role = roleService.findByName("USER");
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role);
        user.setRoles(roleSet);
        return userRepository.save(user);
    }

    public User addAdmin(User user){
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        Role role = roleService.findByName("ADMIN");
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role);
        user.setRoles(roleSet);
        return userRepository.save(user);
    }

    public User getUserById(long id){
        return userRepository.findById(id).get();
    }

    public User updateUser(User user){
        user.setRoles(userRepository.findById(user.getId()).get().getRoles());
        return userRepository.save(user.setPassword(bcryptEncoder.encode(user.getPassword())));
    }

    public void deleteUser(User user){
        userRepository.delete(user);
    }

    public void deleteUserById(long id){
        userRepository.findById(id).ifPresent(userRepository::delete);
    }

    @Override
    public void addAppToUser(long idApp, long idUser) {
        Optional<App> app = appRepository.findById(idApp);
        Optional<User> user = userRepository.findById(idUser);

        if(app.isPresent() && user.isPresent()){
            app.get().getAppUsers().add(user.get());
            appRepository.save(app.get());
        }
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @Override
    public Set<App> getUserApps(long id) {
        return userRepository.findById(id).get().getUserApps();
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
    }

    @Override
    public Set<Role> getUserRolesByUsername(String username){
        return userRepository.findByUsername(username).getRoles();
    }

    @Override
    public User getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

}
