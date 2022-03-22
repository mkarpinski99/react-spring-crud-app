package com.tjee.projekt2.repository;

import com.tjee.projekt2.model.App;
import com.tjee.projekt2.model.AppLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppLocationRepository extends JpaRepository<AppLocation, Long> {
    List<AppLocation> findAllByAppId(long id);
}
