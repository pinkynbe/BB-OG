package com.example.cms.backend.repository;

import com.example.cms.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByUser_IdAndDateOrderByDateDesc(Integer userId, LocalDate date);
    List<Booking> findByDateOrderByDateDesc(LocalDate date);
    List<Booking> findByUser_IdOrderByDateDesc(Integer userId);
}