package com.example.cms.backend.controller;

import com.example.cms.backend.dto.ReqRes;
import com.example.cms.backend.entity.User;
import com.example.cms.backend.service.UserManagementService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
public class UserManagementController {

    private static final Logger logger = LoggerFactory.getLogger(UserManagementController.class);

    @Autowired
    private UserManagementService userManagementService;

    @PostMapping("/auth/send-otp")
//    //Mobile otp without logging.
//    public ResponseEntity<ReqRes> sendOtp(@RequestBody ReqRes request) {
//        if (request.getMobileNo() == null) {
//            ReqRes response = new ReqRes();
//            response.setStatusCode(400);
//            response.setMessage("Mobile number is required");
//            return ResponseEntity.badRequest().body(response);
//        }
//        return ResponseEntity.ok(userManagementService.sendOtp(request.getMobileNo().toString()));
//    }

//    //Mobile otp with logging.
//    public ResponseEntity<ReqRes> sendOtp(@RequestBody ReqRes request) {
//        logger.info("Received request to send OTP");
//        if (request.getMobileNo() == null) {
//            logger.warn("Mobile number is null in the request");
//            ReqRes response = new ReqRes();
//            response.setStatusCode(400);
//            response.setMessage("Mobile number is required");
//            return ResponseEntity.badRequest().body(response);
//        }
//        logger.info("Sending OTP to mobile number: {}", request.getMobileNo());
//        return ResponseEntity.ok(userManagementService.sendOtp(request.getMobileNo().toString()));
//    }

    //Mobile and Email otp.
    public ResponseEntity<ReqRes> sendOtp(@RequestBody ReqRes request) {
        String mobileNumber = request.getMobileNo() != null ? request.getMobileNo().toString() : null;
        String email = request.getEmail();
        return ResponseEntity.ok(userManagementService.sendOtp(mobileNumber, email));
    }

    @PostMapping("/auth/verify-otp")
//    //Mobile otp without logging.
//    public ResponseEntity<ReqRes> verifyOtp(@RequestBody ReqRes request) {
//        if (request.getMobileNo() == null || request.getOtp() == null) {
//            ReqRes response = new ReqRes();
//            response.setStatusCode(400);
//            response.setMessage("Mobile number and OTP are required");
//            return ResponseEntity.badRequest().body(response);
//        }
//        return ResponseEntity.ok(userManagementService.verifyOtp(request.getMobileNo().toString(), request.getOtp()));
//    }

//    //Mobile otp with logging.
//    public ResponseEntity<ReqRes> verifyOtp(@RequestBody ReqRes request) {
//        logger.info("Received request to verify OTP");
//        if (request.getMobileNo() == null || request.getOtp() == null) {
//            logger.warn("Mobile number or OTP is null in the request");
//            ReqRes response = new ReqRes();
//            response.setStatusCode(400);
//            response.setMessage("Mobile number and OTP are required");
//            return ResponseEntity.badRequest().body(response);
//        }
//        logger.info("Verifying OTP for mobile number: {}", request.getMobileNo());
//        return ResponseEntity.ok(userManagementService.verifyOtp(request.getMobileNo().toString(), request.getOtp()));
//    }

    //Mobile an email otp logging.
    public ResponseEntity<ReqRes> verifyOtp(@RequestBody ReqRes request) {
        String mobileNumber = request.getMobileNo() != null ? request.getMobileNo().toString() : null;
        String email = request.getEmail();
        return ResponseEntity.ok(userManagementService.verifyOtp(mobileNumber, email, request.getOtp()));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes reg){
        return ResponseEntity.ok(userManagementService.register(reg));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
        return ResponseEntity.ok(userManagementService.login(req));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(userManagementService.refreshToken(req));
    }

    @GetMapping("/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(userManagementService.getAllUsers());

    }

    @GetMapping("/admin/get-users/{userId}")
    public ResponseEntity<ReqRes> getUSerByID(@PathVariable Integer userId){
        return ResponseEntity.ok(userManagementService.getUsersById(userId));

    }

    @PutMapping("/admin/update/{userId}")
    public ResponseEntity<ReqRes> updateUser(@PathVariable Integer userId, @RequestBody User reqres){
        return ResponseEntity.ok(userManagementService.updateUser(userId, reqres));
    }

    @GetMapping("/adminuser/get-profile")
    public ResponseEntity<ReqRes> getMyProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = userManagementService.getMyInfo(email);
        return  ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<ReqRes> deleteUSer(@PathVariable Integer userId){
        return ResponseEntity.ok(userManagementService.deleteUser(userId));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        // If using a JWT, the client just needs to forget the token.
        // Optionally, you can add the token to a blacklist (requires tracking on the server).

        return ResponseEntity.ok("Logged out successfully. Please delete your token.");
    }

    @PutMapping("/user/update-avatar/{userId}")
    public ResponseEntity<ReqRes> updateAvatar(@PathVariable Integer userId, @RequestBody ReqRes reqRes) {
        String avatar = reqRes.getAvatar();  // Assuming `ReqRes` has an `avatar` field to pass avatar data
        return ResponseEntity.ok(userManagementService.updateAvatar(userId, avatar));
    }


}
