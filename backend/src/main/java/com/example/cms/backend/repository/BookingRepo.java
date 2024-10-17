//package com.example.cms.backend.repository;
//
//import com.example.cms.backend.entity.Booking;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.time.LocalDate;
//import java.util.List;
//
//public interface BookingRepo extends JpaRepository<Booking, Long> {
//    List<Booking> findByUserIdAndDate(Integer userId, LocalDate date);
//}

//package com.example.cms.backend.repository;
//
//import com.example.cms.backend.entity.Booking;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.time.LocalDate;
//import java.util.List;
//
//public interface BookingRepo extends JpaRepository<Booking, Long> {
//    List<Booking> findByUserIdAndDate(Integer userId, LocalDate date);
//    List<Booking> findByUserId(Integer userId);
//}

package com.example.cms.backend.repository;

import com.example.cms.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByUser_IdAndDate(Integer userId, LocalDate date);
    List<Booking> findByUser_Id(Integer userId);
}