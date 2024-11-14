//package com.example.cms.backend.controller;
//
//import com.example.cms.backend.entity.Menu;
//import com.example.cms.backend.service.BookingService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//
//@RestController
//@RequestMapping("/api/menu")
//public class MenuController {
//    @Autowired
//    private BookingService BookingService;
//
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadMenu(@RequestParam("file") MultipartFile file) {
//        try {
//            BookingService.uploadMenu(file);
//            return ResponseEntity.ok("Menu uploaded successfully");
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload menu");
//        }
//    }
//
//    @GetMapping("/latest")
//    public ResponseEntity<byte[]> getLatestMenu() {
//        Menu latestMenu = BookingService.getLatestMenu();
//        if (latestMenu != null) {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_PDF);
//            headers.setContentDispositionFormData("filename", "menu.pdf");
//            return new ResponseEntity<>(latestMenu.getPdfData(), headers, HttpStatus.OK);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//}

package com.example.cms.backend.controller;

import com.example.cms.backend.entity.Menu;
import com.example.cms.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadMenu(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Please select a file to upload");
            }

            if (!file.getContentType().equals("application/pdf")) {
                return ResponseEntity.badRequest().body("Only PDF files are allowed");
            }

            bookingService.uploadMenu(file);
            return ResponseEntity.ok("Menu uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload menu: " + e.getMessage());
        }
    }

    @GetMapping("/latest")
    public ResponseEntity<byte[]> getLatestMenu() {
        Menu latestMenu = bookingService.getLatestMenu();
        if (latestMenu != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "menu.pdf");
            return new ResponseEntity<>(latestMenu.getPdfData(), headers, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}