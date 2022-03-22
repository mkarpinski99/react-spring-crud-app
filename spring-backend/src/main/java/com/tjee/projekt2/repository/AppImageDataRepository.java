package com.tjee.projekt2.repository;

import com.tjee.projekt2.model.AppImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppImageDataRepository extends JpaRepository<AppImageData, Long> {
    List<AppImageData> findAllByAppId(long id);
}
