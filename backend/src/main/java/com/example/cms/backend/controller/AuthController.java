//// AuthController.java
//package com.example.cms.backend.controller;
//
//import com.example.cms.backend.service.JWTUtils;
//import com.example.cms.backend.service.OTPService;
//import com.example.cms.backend.service.UserService;
//import com.example.cms.backend.service.SmsService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.*;
//import com.example.cms.backend.dto.ReqRes;
//import com.example.cms.backend.entity.User;
//import com.example.cms.backend.service.OTPService;
//import com.example.cms.backend.service.JWTUtils;
//import com.example.cms.backend.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//
//@RestController
//@RequestMapping("/auth")
//public class AuthController {
//
//    @Autowired
//    private UserService userService;
//    @Autowired
//    private JWTUtils jwtUtils;
//    @Autowired
//    private AuthenticationManager authenticationManager;
//    @Autowired
//    private OTPService otpService;
//    @Autowired
//    private SmsService smsService;
//
//
//
//    @PostMapping("/send-otp")
//    public ResponseEntity<ReqRes> sendOtp(@RequestParam Long mobileNum) {
//        User user = userService.findByMobileNo(mobileNum);
//        if (user != null) {
//            String otp = otpService.generateOtp(mobileNum.toString());
//            smsService.sendOtp(otp + " is your OTP", mobileNum.toString(), "1107162131505087206");
//            ReqRes response = new ReqRes();
//            response.setMessage("OTP sent to " + mobileNum);
//            return ResponseEntity.ok(response);
//        } else {
//            ReqRes response = new ReqRes();
//            response.setError("User not found");
//            return ResponseEntity.status(404).body(response);
//        }
//    }
//
//    @PostMapping("/verify-otp")
//    public ResponseEntity<ReqRes> verifyOtp(@RequestParam Long mobileNum, @RequestParam String otp) {
//        if (otpService.isOtpValid(mobileNum.toString(), otp)) {
//            User user = userService.findByMobileNo(mobileNum);
//            String token = jwtUtils.generateToken(user);
//            ReqRes response = new ReqRes();
//            response.setToken(token);
//            response.setRole(user.getRole());
//            response.setName(user.getName());
//            response.setMobileNo(user.getMobileNo());
//            return ResponseEntity.ok(response);
//        } else {
//            ReqRes response = new ReqRes();
//            response.setError("Invalid OTP");
//            return ResponseEntity.status(401).body(response);
//        }
//    }
//
//    // Helper method to validate OTP
//    private boolean isOtpValid(String mobileNum, String otp) {
//        // Implement logic to validate OTP, perhaps by checking a cache or database
//        return true; // placeholder
//    }
//
//    private String generateOtp() {
//        return String.valueOf((int) (Math.random() * 900000) + 100000);
//    }
//}
