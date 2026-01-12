package com.bankingsystem.backend.common.service;


import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.admin.repository.AdminRepository;
import com.bankingsystem.backend.common.Entity.PasswordResetOtp;
import com.bankingsystem.backend.common.repository.PasswordResetOtpRepository;
import com.bankingsystem.backend.common.util.EmailService;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ForgotPasswordService {

    private static final int MAX_OTP_ATTEMPTS = 5;
    private static final int OTP_EXPIRY_MIN = 5;

    private final CustomerRepository customerRepository;
    private final AdminRepository adminRepository;
    private final PasswordResetOtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final AuditLogService auditLogService;

    // ================= SEND OTP =================
    public void sendOtp(String email, String ip) {

        String role = resolveRole(email);

        String otp = String.valueOf(
                new SecureRandom().nextInt(900000) + 100000
        );

        otpRepository.save(
            PasswordResetOtp.builder()
                .email(email)
                .otp(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MIN))
                .attempts(0)
                .used(false)
                .build()
        );

        emailService.sendOtp(email, otp);
        auditLogService.log(email, role, "OTP_SENT", ip);
    }

    // ================= RESET PASSWORD =================
    public void resetPassword(
            String email,
            String otp,
            String newPassword,
            String ip
    ) {

        PasswordResetOtp resetOtp = otpRepository
                .findTopByEmailAndUsedFalseOrderByIdDesc(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "OTP invalid"
                        )
                );

        if (resetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            auditLogService.log(email, resolveRole(email), "OTP_EXPIRED", ip);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP expired");
        }

        if (!resetOtp.getOtp().equals(otp)) {
            resetOtp.setAttempts(resetOtp.getAttempts() + 1);
            otpRepository.save(resetOtp);

            if (resetOtp.getAttempts() >= MAX_OTP_ATTEMPTS) {
                handleAccountFailure(email, ip);
            }

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid OTP");
        }

        resetOtp.setUsed(true);
        otpRepository.save(resetOtp);

        // Password update
        customerRepository.findByEmail(email).ifPresent(c -> {
            c.setPassword(passwordEncoder.encode(newPassword));
            customerRepository.save(c);
        });

        adminRepository.findByEmail(email).ifPresent(a -> {
            a.setPassword(passwordEncoder.encode(newPassword));
            adminRepository.save(a);
        });

        auditLogService.log(email, resolveRole(email), "PASSWORD_RESET_SUCCESS", ip);
    }

    // ================= HELPERS =================
    private String resolveRole(String email) {

        if (customerRepository.findByEmail(email).isPresent()) {
            return "CUSTOMER";
        }

        if (adminRepository.findByEmail(email).isPresent()) {
            return "ADMIN";
        }

        throw new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Account not found"
        );
    }

    private void handleAccountFailure(String email, String ip) {

        customerRepository.findByEmail(email).ifPresent(c -> {
            c.setStatus("INACTIVE");
            customerRepository.save(c);
            auditLogService.log(email, "CUSTOMER", "ACCOUNT_LOCKED", ip);
        });

        adminRepository.findByEmail(email).ifPresent(a -> {
            a.setStatus("INACTIVE");
            adminRepository.save(a);
            auditLogService.log(email, "ADMIN", "ACCOUNT_INACTIVATED", ip);
        });
    }
}
