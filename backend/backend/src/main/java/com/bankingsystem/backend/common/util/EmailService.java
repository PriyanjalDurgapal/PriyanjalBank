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

    public void sendMail(String to ,String subject,String body){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);

    }
    public void sendOtp(String to, String otp) {

    String body =
            "Your OTP for password reset is: " + otp +
            "\n\nThis OTP is valid for 10 minutes." +
            "\n\nIf you did not request this, please ignore.";

    sendMail(to, "Password Reset OTP", body);
}

}
