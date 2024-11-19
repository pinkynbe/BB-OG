package com.example.cms.backend.controller;

import com.example.cms.backend.dto.ReqRes;
import com.example.cms.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<ReqRes> createBooking(@PathVariable Integer userId, @RequestBody ReqRes bookingRequest) {
        return ResponseEntity.ok(bookingService.createBooking(userId, bookingRequest));
    }

    @PutMapping("/cancel/{userId}/{bookingId}")
    public ResponseEntity<ReqRes> cancelBooking(@PathVariable Integer userId, @PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.cancelBooking(userId, bookingId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ReqRes> getUserBookings(
            @PathVariable Integer userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId, date));
    }

    @GetMapping("/today/{userId}")
    public ResponseEntity<ReqRes> getTodayBookings(
            @PathVariable Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(bookingService.getTodayBookings(userId, date));
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<ReqRes> getAllBookings(@PathVariable Integer userId) {
        return ResponseEntity.ok(bookingService.getAllBookings(userId));
    }

    @PostMapping("/emergency/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ReqRes> bookEmergencyMeal(@PathVariable Integer userId, @RequestBody ReqRes bookingRequest) {
        return ResponseEntity.ok(bookingService.createEmergencyBooking(userId, bookingRequest));
    }
}