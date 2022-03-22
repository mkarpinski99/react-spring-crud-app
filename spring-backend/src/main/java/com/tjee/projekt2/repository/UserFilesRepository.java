package com.tjee.projekt2.repository;

import com.tjee.projekt2.model.UserFiles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFilesRepository extends JpaRepository<UserFiles, Long> {
    UserFiles findByFilename(String filename);
}
