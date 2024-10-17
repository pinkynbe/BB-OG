//package com.example.cms.backend.entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//
//import java.util.Date;
//
//@Entity
//@Data
//public class Booking {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer bookId;
//
//    @ManyToOne
//    @JoinColumn(nullable = false)
//    private User user;
//
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date date;
//    private Integer mealCount;
//    private String refNo;
//    private String status;
//    private String remark;
//}

/////////////////////////////////////////////////////////////////////////////////////////////////
//package com.example.cms.backend.entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//import java.time.LocalDate;
//
//@Entity
//@Data
//public class BookingCopy {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long bookId;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
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