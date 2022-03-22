package com.tjee.projekt2.service.userFiles;

import com.tjee.projekt2.model.UserFiles;
import com.tjee.projekt2.repository.AppRepository;
import com.tjee.projekt2.repository.UserFilesRepository;
import com.tjee.projekt2.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserFilesServiceImpl implements UserFilesService{
    UserFilesRepository userFilesRepository;
    UserRepository userRepository;
    AppRepository appRepository;

    @Autowired
    public UserFilesServiceImpl(UserFilesRepository userFilesRepository, UserRepository userRepository, AppRepository appRepository){
        this.userFilesRepository = userFilesRepository;
        this.userRepository = userRepository;
        this.appRepository = appRepository;
    }

    @Override
    public void addUserFiles(UserFiles userFiles) {
        userFilesRepository.save(userFiles);
    }

    @Override
    public void removeUserFiles(String filename) {
        userFilesRepository.delete(userFilesRepository.findByFilename(filename));
    }

    @Override
    public Set<UserFiles> getUserFilesByUser(long id) {
        return userRepository.findById(id).get().getFiles();
    }

    @Override
    public Set<UserFiles> getUserFilesByApp(long id) {
        return appRepository.findById(id).get().getFiles();
    }
}
