package com.tjee.projekt2.repository;

import com.tjee.projekt2.model.User;
import com.tjee.projekt2.model.UserFiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
