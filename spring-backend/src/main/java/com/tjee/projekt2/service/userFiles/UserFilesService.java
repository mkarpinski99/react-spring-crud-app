package com.tjee.projekt2.service.userFiles;

import com.tjee.projekt2.model.UserFiles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UserFilesService{
    void addUserFiles(UserFiles userFiles);
    void removeUserFiles(String filename);
    Set<UserFiles> getUserFilesByUser(long id);
    Set<UserFiles> getUserFilesByApp(long id);
//    Stats getStats();
}
