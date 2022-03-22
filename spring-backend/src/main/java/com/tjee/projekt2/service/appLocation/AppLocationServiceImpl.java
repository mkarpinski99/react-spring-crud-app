package com.tjee.projekt2.service.appLocation;

import com.tjee.projekt2.model.App;
import com.tjee.projekt2.model.AppLocation;
import com.tjee.projekt2.repository.AppLocationRepository;
import com.tjee.projekt2.repository.AppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AppLocationServiceImpl implements AppLocationService{

    AppLocationRepository appLocationRepository;
    AppRepository appRepository;

    @Autowired
    public AppLocationServiceImpl(AppLocationRepository appLocationRepository, AppRepository appRepository){
        this.appLocationRepository = appLocationRepository;
        this.appRepository = appRepository;
    }

    @Override
    public List<AppLocation> getAllAppLocations() {
        return appLocationRepository.findAll();
    }

    @Override
    public void deleteAppLocation(long id) {
        appLocationRepository.delete(appLocationRepository.findById(id).get());
    }

    @Override
    public AppLocation updateAppLocation(AppLocation appLocation, long appId) throws Exception {
        Optional<App> app = appRepository.findById(appId);

        if(app.isPresent()){
            appLocation.setApp(app.get());
            return appLocationRepository.save(appLocation);
        }
        throw new Exception("Wystąpił bład podczas dodawania lokalizacji aplikacji");
    }

    @Override
    public AppLocation addAppLocation(AppLocation appLocation, long appId) throws Exception {
        Optional<App> app = appRepository.findById(appId);

        if(app.isPresent()){
            appLocation.setApp(app.get());
            return appLocationRepository.save(appLocation);
        }
        throw new Exception("Wystąpił bład podczas dodawania lokalizacji aplikacji");
    }

    @Override
    public AppLocation getAppLocationByID(long id) {
        return appLocationRepository.findById(id).get();
    }

    @Override
    public List<AppLocation> getAppLocationsByAppID(long id) {
        return new ArrayList<>(appRepository.findById(id).get().getAppLocationSet());
    }
}
