package com.example.cms.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
public class SmsService {

    private static final Logger logger = LoggerFactory.getLogger(SmsService.class);

    @Value("${sms.api.username}")
    private String username;

    @Value("${sms.api.password}")
    private String password;

    @Value("${sms.api.sender}")
    private String sender;

    @Value("${sms.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public SmsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String sendSms(String mobileNumber, String message, String contentId) {
        logger.info("Sending SMS to {}", mobileNumber);

        // Create a map for parameters
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("username", username);
        params.add("password", password);
        params.add("from", sender);
        params.add("to", mobileNumber);
        params.add("text", message);
        params.add("unicode", "false"); // Set to "false" or modify based on API
        params.add("dltContentId", contentId);

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        // Create HttpEntity with parameters and headers
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);

        try {
            // Send the POST request
            ResponseEntity<String> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, String.class);

            // Check if the response was successful
            if (response.getStatusCode() == HttpStatus.OK) {
                logger.info("SMS sent successfully. Response: {}", response.getBody());
                return response.getBody();
            } else {
                logger.error("Failed to send SMS. Response status: {}", response.getStatusCode());
                return "Failed to send SMS";
            }
        } catch (Exception e) {
            logger.error("Error sending SMS: ", e);
            throw new RuntimeException("Failed to send SMS", e);
        }
    }
}
