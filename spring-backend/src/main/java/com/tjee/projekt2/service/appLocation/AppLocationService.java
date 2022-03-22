package com.tjee.projekt2.service.appLocation;



import com.tjee.projekt2.model.AppLocation;

import java.util.List;

public interface AppLocationService {
    List<AppLocation> getAllAppLocations();
    void deleteAppLocation(long id);
    AppLocation updateAppLocation(AppLocation appLocation, long appId) throws Exception;
    AppLocation addAppLocation(AppLocation appLocation, long appId) throws Exception;
    AppLocation getAppLocationByID(long id);
    List<AppLocation> getAppLocationsByAppID(long id);
}
