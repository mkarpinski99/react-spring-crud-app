package com.tjee.projekt2.service.app;


import com.tjee.projekt2.model.App;
import com.tjee.projekt2.model.AppLocation;
import com.tjee.projekt2.model.User;

import java.sql.SQLDataException;
import java.util.List;
import java.util.Set;

public interface AppService {
    App addApp(App app);
    List<App> getAllApps();
    void deleteApp(long id);
    App updateApp(App app);
    App getAppByID(long id) throws SQLDataException;
//    Stats getAppStats(long id);
    Set<AppLocation> getAppLocations(long id);
    Set<User> getAppUsers(long id);
}
