package com.tjee.projekt2.controller;


import com.tjee.projekt2.model.AppImageData;
import com.tjee.projekt2.service.appImageData.AppImageDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "api/appImageData")
public class AppImageDataController {

    @Autowired
    AppImageDataService appImageDataService;

    @GetMapping(value = "/byApp/{id}")
    public List<AppImageData> getImagesByApp(@PathVariable long id){
        return appImageDataService.getImagesByAppId(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{appId}")
    public AppImageData addImage(@Valid @RequestBody AppImageData appImageData, @PathVariable long appId){
        return appImageDataService.addImage(appImageData, appId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/{appId}")
    public AppImageData updateImage(@Valid @RequestBody AppImageData appImageData, @PathVariable long appId){
        return appImageDataService.updateImage(appImageData, appId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(value = "/{id}")
    public void deleteImage(@PathVariable long id){
        appImageDataService.deleteImage(id);
    }


}
