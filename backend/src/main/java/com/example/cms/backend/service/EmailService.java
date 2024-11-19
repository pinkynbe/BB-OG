package com.example.cms.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingConfirmationEmail(String toEmail, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            System.out.println("Mail sent successfully!");
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }

    public void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Your OTP for Login \uD83D\uDD11");
//            message.setText("Your OTP for BiteBooking is: " + otp + ". It will expire in 5 minutes. \n Happy Booking ;)");
            message.setText("\uD83C\uDF54 Your meal is on its way! \uD83D\uDE80 \n But first, let's sprinkle some magic. Use this secret code to confirm your delicious journey: \n\n \uD83C\uDF7D\uFE0F   OTP: " + otp + "   \uD83C\uDF7D\uFE0F \n\n Bon appétit! \uD83C\uDF89");
            mailSender.send(message);
            System.out.println("OTP email sent successfully!");
        } catch (Exception e) {
            System.err.println("Error sending OTP email: " + e.getMessage());
        }
    }
}
