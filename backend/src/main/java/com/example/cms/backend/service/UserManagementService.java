package com.example.cms.backend.service;

import com.example.cms.backend.dto.ReqRes;
import com.example.cms.backend.entity.User;
import com.example.cms.backend.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserManagementService {

    private static final Logger logger = LoggerFactory.getLogger(UserManagementService.class);

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;
    @Autowired
    private SmsService smsService;
    @Autowired
    private OtpService otpService;

//    //methods without logging details
//    public ReqRes sendOtp(String mobileNumber) {
//        ReqRes response = new ReqRes();
//        try {
//            User user = userRepo.findByMobileNo(Long.parseLong(mobileNumber));
//            if (user == null) {
//                response.setStatusCode(404);
//                response.setMessage("User not found");
//                return response;
//            }
//
//            String otp = otpService.generateOtp(mobileNumber);
//            String message = otp + " is OTP for Login to NBE Portal";
//            String smsResponse = smsService.sendSms(mobileNumber, message, "1107162131505087206");
//
//            response.setStatusCode(200);
//            response.setMessage("OTP sent successfully");
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error sending OTP: " + e.getMessage());
//        }
//        return response;
//    }

//    //Added logging option for otp in console without emailing otp.
//    public ReqRes sendOtp(String mobileNumber) {
//        ReqRes response = new ReqRes();
//        try {
//            logger.info("Sending OTP to mobile number: {}", mobileNumber);
//            User user = userRepo.findByMobileNo(Long.parseLong(mobileNumber));
//            if (user == null) {
//                logger.warn("User not found for mobile number: {}", mobileNumber);
//                response.setStatusCode(404);
//                response.setMessage("User not found");
//                return response;
//            }
//
//            String otp = otpService.generateOtp(mobileNumber);
//            String message = otp + " is OTP for Login to NBE Portal";
//            logger.debug("Generated OTP: {} for mobile number: {}", otp, mobileNumber);
//
//            String smsResponse = smsService.sendSms(mobileNumber, message, "1107162131505087206");
//            logger.info("SMS sent. Response: {}", smsResponse);
//
//            response.setStatusCode(200);
//            response.setMessage("OTP sent successfully");
//        } catch (Exception e) {
//            logger.error("Error sending OTP: ", e);
//            response.setStatusCode(500);
//            response.setMessage("Error sending OTP: " + e.getMessage());
//        }
//        return response;
//    }

    //Sending otp to mobile and email
    public ReqRes sendOtp(String mobileNumber, String email) {
        ReqRes response = new ReqRes();
        try {
            logger.info("Attempting to send OTP. Mobile: {}, Email: {}", mobileNumber, email);
            User user = null;
            if (mobileNumber != null) {
                Optional<User> userOpt = Optional.ofNullable(userRepo.findByMobileNo(Long.parseLong(mobileNumber)));
                if (userOpt.isPresent()) {
                    user = userOpt.get();
                } else {
                    logger.warn("User not found with mobile number: {}", mobileNumber);
                    throw new RuntimeException("User not found with mobile number: " + mobileNumber);
                }
            } else if (email != null) {
                Optional<User> userOpt = userRepo.findByEmail(email);
                if (userOpt.isPresent()) {
                    user = userOpt.get();
                } else {
                    logger.warn("User not found with email: {}", email);
                    throw new RuntimeException("User not found with email: " + email);
                }
            }

            if (user == null) {
                logger.error("User not found for either mobile or email");
                throw new RuntimeException("User not found");
            }

            String otp = otpService.generateOtp(mobileNumber != null ? mobileNumber : email);
            logger.debug("OTP generated: {}", otp);

            if (mobileNumber != null) {
                String message = otp + " is OTP for Login to NBE Portal";
                smsService.sendSms(mobileNumber, message, "1107162131505087206");
                logger.info("SMS OTP sent to: {}", mobileNumber);
            }

            if (email != null) {
                emailService.sendOtpEmail(email, otp);
                logger.info("Email OTP sent to: {}", email);
            }

            response.setStatusCode(200);
            response.setMessage("OTP sent successfully");
        } catch (Exception e) {
            logger.error("Error sending OTP: ", e);
            response.setStatusCode(500);
            response.setMessage("Error sending OTP: " + e.getMessage());
        }
        return response;
    }

//    //Mobile otp with logging
//    public ReqRes verifyOtp(String mobileNumber, String otp) {
//        ReqRes response = new ReqRes();
//        try {
//            User user = userRepo.findByMobileNo(Long.parseLong(mobileNumber));
//            if (user == null) {
//                response.setStatusCode(404);
//                response.setMessage("User not found");
//                return response;
//            }
//
//            if (otpService.verifyOtp(mobileNumber, otp)) {
//                String token = jwtUtils.generateToken(user);
//                response.setStatusCode(200);
//                response.setToken(token);
//                response.setRole(user.getRole());
//                response.setMessage("OTP verified successfully");
//            } else {
//                response.setStatusCode(400);
//                response.setMessage("Invalid OTP");
//            }
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error verifying OTP: " + e.getMessage());
//        }
//        return response;
//    }

    //Mobile and email otp login.
    public ReqRes verifyOtp(String mobileNumber, String email, String otp) {
        ReqRes response = new ReqRes();
        try {
            logger.info("Attempting to verify OTP. Mobile: {}, Email: {}", mobileNumber, email);
            User user = null;
            String identifier = mobileNumber != null ? mobileNumber : email;

            if (mobileNumber != null) {
                Optional<User> userOpt = Optional.ofNullable(userRepo.findByMobileNo(Long.parseLong(mobileNumber)));
                if (userOpt.isPresent()) {
                    user = userOpt.get();
                } else {
                    logger.warn("User not found with mobile number: {}", mobileNumber);
                    throw new RuntimeException("User not found with mobile number: " + mobileNumber);
                }
            } else if (email != null) {
                Optional<User> userOpt = userRepo.findByEmail(email);
                if (userOpt.isPresent()) {
                    user = userOpt.get();
                } else {
                    logger.warn("User not found with email: {}", email);
                    throw new RuntimeException("User not found with email: " + email);
                }
            }

            if (user == null) {
                logger.error("User not found for either mobile or email");
                throw new RuntimeException("User not found");
            }

            if (otpService.verifyOtp(identifier, otp)) {
                String token = jwtUtils.generateToken(user);
                response.setStatusCode(200);
                response.setToken(token);
                response.setRole(user.getRole());
                response.setMessage("OTP verified successfully");
                logger.info("OTP verified successfully for user: {}", user.getId());
            } else {
                response.setStatusCode(400);
                response.setMessage("Invalid OTP");
                logger.warn("Invalid OTP attempt for user: {}", user.getId());
            }
        } catch (Exception e) {
            logger.error("Error verifying OTP: ", e);
            response.setStatusCode(500);
            response.setMessage("Error verifying OTP: " + e.getMessage());
        }
        return response;
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public ReqRes register(ReqRes registrationRequest){
        ReqRes resp = new ReqRes();

        try {
            User user = new User();
            user.setEmail(registrationRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setName(registrationRequest.getName());
            user.setDesignation(registrationRequest.getDesignation());
            user.setDepartment(registrationRequest.getDepartment());
            user.setMobileNo(registrationRequest.getMobileNo());
            user.setPan(registrationRequest.getPan());
            user.setRole(registrationRequest.getRole());

            User userResult = userRepo.save(user);
            if (userResult.getId()>0) {
                resp.setUser((userResult));
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        }catch (Exception e){
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }


    public ReqRes login(ReqRes loginRequest){
        ReqRes response = new ReqRes();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully Logged In");

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenReqiest){
        ReqRes response = new ReqRes();
        try{
            String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
            User users = userRepo.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenReqiest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }


    public ReqRes getAllUsers() {
        ReqRes reqRes = new ReqRes();

        try {
            List<User> result = userRepo.findAll();
            if (!result.isEmpty()) {
                reqRes.setUserList(result);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("No users found");
            }
            return reqRes;
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
            return reqRes;
        }
    }


    public ReqRes getUsersById(Integer id) {
        ReqRes reqRes = new ReqRes();
        try {
            User usersById = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setUser(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }


    public ReqRes deleteUser(Integer userId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                userRepo.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes updateUser(Integer userId, User updatedUser) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                User existingUser = userOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setName(updatedUser.getName());
                existingUser.setDesignation(updatedUser.getDesignation());
                existingUser.setDepartment(updatedUser.getDepartment());
                existingUser.setMobileNo(updatedUser.getMobileNo());
                existingUser.setPan(updatedUser.getPan());
                existingUser.setRole(updatedUser.getRole());

                // Check if password is present in the request
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                User savedUser = userRepo.save(existingUser);
                reqRes.setUser(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes updateAvatar(Integer userId, String avatar) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setAvatar(avatar);  // Set the new avatar data
                User updatedUser = userRepo.save(user);
                reqRes.setUser(updatedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Avatar updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating avatar: " + e.getMessage());
        }
        return reqRes;
    }

    public ReqRes getMyInfo(String email){
        ReqRes reqRes = new ReqRes();
        try {
            Optional<User> userOptional = userRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setUser(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;

    }
}