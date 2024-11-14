package com.example.cms.backend.repository;

import com.example.cms.backend.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepo extends JpaRepository<Menu, Long> {
    Menu findTopByOrderByUploadDateDesc();
}
