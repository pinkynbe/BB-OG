//package com.example.cms.backend.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.*;
//import lombok.Data;
//import java.time.LocalDate;
//
//@Entity
//@Data
//public class Booking {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long bookId;
//
//    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(nullable = false)
//    private User user;
//
//    @Column(nullable = false)
//    private Long menuId;
//
//    @Column(nullable = false)
//    private LocalDate date;
//
//    @Column(nullable = false)
//    private Integer mealCount;
//
//    @Column(nullable = false)
//    private boolean isCancelled = false;
//
////    // Add this method to get userId without exposing the entire User object
////    public Integer getUserId() {
////        return user != null ? user.getId() : null;
////    }
//}

//package com.example.cms.backend.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import jakarta.persistence.*;
//import lombok.Data;
//import java.time.LocalDate;
//
//@Entity
//@Data
//public class Booking {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long bookId;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id", nullable = false)
////    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//    private User user;
//
//    @Column(nullable = false)
//    private Long menuId;
//
//    @Column(nullable = false)
//    private LocalDate date;
//
//    @Column(nullable = false)
//    private Integer mealCount;
//
//    @Column(nullable = false)
//    private boolean isCancelled = false;
//}


package com.example.cms.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "bookingList"})
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer mealCount;

    @Column(nullable = false)
    private boolean isCancelled = false;
}