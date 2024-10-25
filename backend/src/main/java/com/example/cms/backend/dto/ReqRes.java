//package com.example.cms.backend.dto;
//
//import com.example.cms.backend.entity.Booking;
//import com.example.cms.backend.entity.User;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonInclude;
//import lombok.Data;
//
//import java.util.List;
//
//@Data
//@JsonInclude(JsonInclude.Include.NON_NULL)
//@JsonIgnoreProperties(ignoreUnknown = true)
//public class ReqRes {
//
//    private int statusCode;
//    private String error;
//    private String message;
//    private String token;
//    private String refreshToken;
//    private String expirationTime;
//    private String name;
//    private String city;
//    private String role;
//    private String email;
//    private String password;
//    private User user;
//    private List<User> userList;
//    private Integer userId;
//    private Long menuId;
//    private String date;
//    private Integer mealCount;
//    private Booking booking;
//    private List<Booking> bookingList;
//
//}

package com.example.cms.backend.dto;

import com.example.cms.backend.entity.Booking;
import com.example.cms.backend.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;

    //User-related fields
    private String email;
    private String password;
    private String name;
    private String designation;
    private String department;
    private Long mobileNo;
    private String pan;
    private String role;

    private User user;
    private List<User> userList;

    // Booking-related fields
    private Integer userId;
    private String date;
    private Integer mealCount;
    private Booking booking;
    private Integer count;
    private Integer todayCancellations;
    private Integer todayBookings;
    private List<Booking> bookingList;
}