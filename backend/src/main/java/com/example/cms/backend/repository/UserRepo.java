package com.example.cms.backend.repository;

import com.example.cms.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    User findByMobileNo(String mobileNo);

    Optional<User> findByMobileNoOrEmail(String mobile, String email);

    Optional<User> findByPan(String pan);
}
