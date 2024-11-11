package com.example.cms.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

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
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("username", username)
                .queryParam("password", password)
                .queryParam("from", sender)
                .queryParam("to", mobileNumber)
                .queryParam("text", message)
                .queryParam("unicode", "false")
                .queryParam("dltContentId", contentId);

        String url = builder.toUriString();
        logger.debug("SMS API URL: {}", url);

        try {
            String response = restTemplate.getForObject(url, String.class);
            logger.info("SMS sent successfully. Response: {}", response);
            return response;
        } catch (Exception e) {
            logger.error("Error sending SMS: ", e);
            throw new RuntimeException("Failed to send SMS", e);
        }
    }
}