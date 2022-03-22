package com.tjee.projekt2;

import com.tjee.projekt2.config.StorageProperties;
import com.tjee.projekt2.repository.AppLocationRepository;
import com.tjee.projekt2.repository.AppRepository;
import com.tjee.projekt2.repository.UserRepository;
import com.tjee.projekt2.service.app.AppService;
import com.tjee.projekt2.service.appImageData.AppImageDataService;
import com.tjee.projekt2.service.appLocation.AppLocationService;
import com.tjee.projekt2.service.user.UserService;
import com.tjee.projekt2.service.userFiles.UserFilesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
public class Projekt2Application {

    public static void main(String[] args) {
        SpringApplication.run(Projekt2Application.class, args);
    }

    @Bean
    public CommandLineRunner demo(UserService userService, AppService appService, AppLocationService appLocationService,
                                  AppImageDataService appImageDataService, UserFilesService userFilesService){
        return (args) -> {
            File dataDir = new File(System.getProperty("user.dir") + "\\data");

//            if(dataDir.exists()){
//                try {
//                    Map<String, List<String[]>> tables = new HashMap<>();
//                    File[] files = dataDir.listFiles();
//                    for ( File file : files){
//                        tables.put(file.getName(), CustomCSVReader.readFromCsv(file));
//                    }
//                    CustomXMLWriter.writeToXMLBeans(tables);
//                } catch(Exception e) {
//                    log.error("Błąd podczas wczytywania danych startowych");
//                    e.printStackTrace();
//                }
//            }
        };
    }
}
