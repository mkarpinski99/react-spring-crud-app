package com.tjee.projekt2.controller;


import com.tjee.projekt2.model.AppLocation;
import com.tjee.projekt2.service.appLocation.AppLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "api/appLocation")
public class AppLocationController {

    @Autowired
    private AppLocationService appLocationService;


    @GetMapping
    public List<AppLocation> getAppLocations() {
        return appLocationService.getAllAppLocations();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{appId}")
    public AppLocation addAppLocation(@Valid @RequestBody AppLocation appLocation, @PathVariable long appId) throws Exception {
        return appLocationService.addAppLocation(appLocation, appId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{id}")
    public void deleteAppLocation(@PathVariable long id){
        appLocationService.deleteAppLocation(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/{id}")
    public AppLocation updateAppLocation(@Valid @RequestBody AppLocation appLocation, @PathVariable long id) throws Exception {
        return appLocationService.updateAppLocation(appLocation, id);
    }

    @GetMapping(value = "/{id}")
    public AppLocation getAppLocationByID(@PathVariable long id){
        return appLocationService.getAppLocationByID(id);
    }
}
