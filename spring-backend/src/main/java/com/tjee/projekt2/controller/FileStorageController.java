package com.tjee.projekt2.controller;

import com.tjee.projekt2.model.App;
import com.tjee.projekt2.model.User;
import com.tjee.projekt2.model.UserFiles;
import com.tjee.projekt2.service.FileStorage.StorageService;
import com.tjee.projekt2.service.app.AppService;
import com.tjee.projekt2.service.user.UserService;
import com.tjee.projekt2.service.userFiles.UserFilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.sql.SQLDataException;

@Controller
@RequestMapping(value = "api/files")
public class FileStorageController {

    private final StorageService storageService;

    @Autowired
    private UserFilesService userFilesService;

    @Autowired
    private UserService userService;

    @Autowired
    private AppService appService;

    @Autowired
    public FileStorageController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping("/")
    public ResponseEntity<Void> handleFileUpload(@RequestParam("file") MultipartFile file,
                                                 @RequestParam("user") long userId,
                                                 @RequestParam("app") long appId) {
        try {
                storageService.store(file);
                User user = userService.getUserById(userId);
                App app = appService.getAppByID(appId);
                userFilesService.addUserFiles(new UserFiles().setUser(user)
                        .setApp(app)
                        .setFilename(file.getOriginalFilename()));
        }
        catch (NullPointerException | SQLDataException nullPointerException) {
            throw new NullPointerException();
        }

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{filename:.+}")
    public void deleteFile(@PathVariable String filename) {
        storageService.deleteFile(filename);
        userFilesService.removeUserFiles(filename);
    }

//    @GetMapping("/stats")
//    public Stats getFilesStats() {
//        return userFilesService.getStats();
//    }
}
