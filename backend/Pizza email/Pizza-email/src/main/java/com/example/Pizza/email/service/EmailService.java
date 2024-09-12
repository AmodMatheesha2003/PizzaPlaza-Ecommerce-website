package com.example.Pizza.email.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    private String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);  // Generate 6-digit OTP
        return String.valueOf(otp);
    }

    public String sendOtpEmail(String toEmail) {
        String otp = generateOTP();
        String subject = "Your OTP Code";
        //String body = "Your OTP code is: " + otp;

        String body = "Dear User,\n\n" +
                "Thank you for registering with The Pizza Plaza!\n\n" +
                "Your One-Time Password (OTP) for verifying your account is: " + otp + "\n\n" +
                "Please enter this code on the website to complete your registration.\n\n" +
                "If you did not request this code, please ignore this email.\n\n" +
                "Best regards,\n" +
                "The Pizza Plaza Team";



        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("chatmeofficial2003@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);

        return otp;
    }

    public void sendSimpleEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("chatmeofficial2003@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
