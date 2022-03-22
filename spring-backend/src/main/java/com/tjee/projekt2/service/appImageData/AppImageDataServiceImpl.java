package com.tjee.projekt2.service.appImageData;

import com.tjee.projekt2.model.AppImageData;
import com.tjee.projekt2.repository.AppImageDataRepository;
import com.tjee.projekt2.repository.AppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppImageDataServiceImpl implements AppImageDataService{

    AppImageDataRepository appImageDataRepository;

    @Autowired
    AppRepository appRepository;

    @Autowired
    public AppImageDataServiceImpl(AppImageDataRepository appImageDataRepository){
        this.appImageDataRepository = appImageDataRepository;
    }

    @Override
    public List<AppImageData> getImagesByAppId(long id) {
        return appImageDataRepository.findAllByAppId(id);
    }

    @Override
    public AppImageData addImage(AppImageData image, long appId) {
        image.setApp(appRepository.findById(appId).get());
        return appImageDataRepository.save(image);
    }

    @Override
    public AppImageData updateImage(AppImageData image, long appId) {
        return appImageDataRepository.save(image.setApp(appRepository.findById(appId).get()));
    }

    @Override
    public void deleteImage(long id) {
        appImageDataRepository.delete(appImageDataRepository.findById(id).get());
    }
}
