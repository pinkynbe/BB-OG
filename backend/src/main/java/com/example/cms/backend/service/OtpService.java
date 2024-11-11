package com.example.cms.backend.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {
    private final Map<String, String> otpStorage = new HashMap<>();
    private static final long OTP_VALID_DURATION = 5 * 60 * 1000; // 5 minutes

    public String generateOtp(String mobileNumber) {
        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStorage.put(mobileNumber, otp + ":" + System.currentTimeMillis());
        return otp;
    }

    public boolean verifyOtp(String mobileNumber, String otp) {
        String storedOtpInfo = otpStorage.get(mobileNumber);
        if (storedOtpInfo != null) {
            String[] parts = storedOtpInfo.split(":");
            long generationTime = Long.parseLong(parts[1]);
            if (System.currentTimeMillis() - generationTime < OTP_VALID_DURATION) {
                boolean isValid = otp.equals(parts[0]);
                if (isValid) {
                    otpStorage.remove(mobileNumber); // Remove OTP after successful verification
                }
                return isValid;
            }
        }
        return false;
    }
}