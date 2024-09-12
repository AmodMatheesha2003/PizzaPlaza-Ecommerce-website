package com.example.Pizza.email.controller;

import com.example.Pizza.email.service.EmailService;
import com.example.Pizza.email.data.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendEmail(@RequestBody Email email) {
        emailService.sendSimpleEmail(email.getToEmail(), email.getSubject(), email.getBody());
        return "Email sent successfully!";
    }
    @PostMapping("/sendOtp")
    public String sendOtp(@RequestBody Email email) {
        String otp = emailService.sendOtpEmail(email.getToEmail());
        return "OTP sent to " + email.getToEmail();
    }
}
