package com.tjee.projekt2.service.appImageData;


import com.tjee.projekt2.model.AppImageData;

import java.util.List;

public interface AppImageDataService {
    List<AppImageData> getImagesByAppId(long id);
    AppImageData addImage(AppImageData image, long appId);
    AppImageData updateImage(AppImageData image, long appId);
    void deleteImage(long id);
}
