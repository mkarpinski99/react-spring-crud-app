package com.tjee.projekt2.controller;

import com.tjee.projekt2.model.App;
import com.tjee.projekt2.model.AppLocation;
import com.tjee.projekt2.model.User;
import com.tjee.projekt2.model.UserFiles;
import com.tjee.projekt2.service.app.AppService;
import com.tjee.projekt2.service.user.UserService;
import com.tjee.projekt2.service.userFiles.UserFilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.SQLDataException;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/app")
public class AppController {

    AppService appService;
    UserService userService;
    UserFilesService userFilesService;

    @Autowired
    public AppController(AppService appService, UserService userService, UserFilesService userFilesService){
        this.appService = appService;
        this.userService = userService;
        this.userFilesService = userFilesService;
    }

    @GetMapping
    public List<App> getApps() {
        return appService.getAllApps();
    }

    @PostMapping
    public void addApp(@RequestBody @Valid App app) {
        appService.addApp(app);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{id}")
    public void deleteApp(@PathVariable long id){
        appService.deleteApp(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public App updateApp(@Valid @RequestBody App app){
        return appService.updateApp(app);
    }

    @GetMapping(value = "/{id}/appLocations")
    public Set<AppLocation> getAppLocationsByAppID(@PathVariable long id){
        return appService.getAppLocations(id);
    }
    @GetMapping(value = "/{id}/users")
    public Set<User> getAppUsers(@PathVariable long id){
        return appService.getAppUsers(id);
    }

    @GetMapping(value = "{id}/files")
    public Set<UserFiles> getAppFiles(@PathVariable long id) {
        return userFilesService.getUserFilesByApp(id);
    }

    @GetMapping("/{id}")
    public App getAppById(@PathVariable long id) throws SQLDataException {
        return appService.getAppByID(id);
    }

//
//    @GetMapping(value = "{id}/stats")
//    public Stats getAppStats(@PathVariable long id) {
//        return appService.getAppStats(id);
//    }
}
