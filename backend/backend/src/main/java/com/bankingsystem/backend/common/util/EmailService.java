package com.bankingsystem.backend.common.util;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendCustomerCredentials(
            String to,
            String customerId,
            String accountNumber,
            String password
    ) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your Bank Account Credentials");
        message.setText(
                "Welcome to Our Bank\n\n" +
                "Customer ID: " + customerId + "\n" +
                "Account Number: " + accountNumber + "\n" +
                "Temporary Password: " + password + "\n\n" +
                "Please change your password after login."
        );
        mailSender.send(message);
    }
}
