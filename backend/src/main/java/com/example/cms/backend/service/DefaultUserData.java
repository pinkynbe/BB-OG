package com.example.cms.backend.service;

import com.example.cms.backend.entity.User;
import com.example.cms.backend.repository.UserRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DefaultUserData {

    @Autowired
    private UserRepo userRepo;

    @PostConstruct
    public void init() {
        // Check if any data exists
        if (userRepo.count() == 0) {
            // Add default entry
            User defaultUser = new User();
            defaultUser.setEmail("pinkynbe@gmail.com");
            defaultUser.setName("Pinky Nishad");
            defaultUser.setDesignation("Jr. Programmer");
            defaultUser.setDepartment("IT_Section");
            defaultUser.setMobileNo("8528975985");
            defaultUser.setPan("BQP56WYN");
            defaultUser.setRole("ADMIN");
            userRepo.save(defaultUser);
        }
    }
}
