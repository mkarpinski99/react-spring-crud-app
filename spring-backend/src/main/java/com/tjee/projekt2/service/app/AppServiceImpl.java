package com.tjee.projekt2.service.app;


import com.tjee.projekt2.model.App;
import com.tjee.projekt2.model.AppLocation;
import com.tjee.projekt2.model.User;
import com.tjee.projekt2.repository.AppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLDataException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AppServiceImpl implements AppService {

    AppRepository appRepository;

    @Autowired
    public AppServiceImpl(AppRepository appRepository){
        this.appRepository = appRepository;
    }

    @Override
    public App addApp(App app) {
        return appRepository.save(app);
    }

    @Override
    public List<App> getAllApps() {
        return appRepository.findAll();
    }

    @Override
    public void deleteApp(long id) {
        appRepository.delete(appRepository.findById(id).get());
    }

    @Override
    public App updateApp(App app) {
        return appRepository.save(app);
    }

    @Override
    public App getAppByID(long id) throws SQLDataException{
        Optional<App> app = appRepository.findById(id);

        if(app.isPresent()){
            return app.get();
        }
        throw new SQLDataException("App not found");
    }

    @Override
    public Set<AppLocation> getAppLocations(long id){
        return appRepository.findById(id).get().getAppLocationSet();
    }

    @Override
    public Set<User> getAppUsers(long id) {
        return appRepository.findById(id).get().getAppUsers();
    }


}
