package com.bankingsystem.backend.card.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.card.entity.CardOtp;
import com.bankingsystem.backend.card.entity.VirtualCard;
import com.bankingsystem.backend.card.repository.CardOtpRepository;
import com.bankingsystem.backend.common.util.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardOtpService {

    private static final int OTP_EXPIRY_MIN = 10;
    private static final int MAX_OTP_ATTEMPTS = 5;

    private final CardOtpRepository otpRepository;
    private final EmailService emailService;
    private final CardAuditService auditService;

    /* ================= SEND OTP ================= */

    public void sendOtp(VirtualCard card, String email, String purpose) {

        String otp = String.valueOf(
                new SecureRandom().nextInt(900000) + 100000
        );

        otpRepository.save(
            CardOtp.builder()
                .cardId(card.getId())
                .otp(otp)
                .purpose(purpose)
                .expiryTime(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MIN))
                .attempts(0)
                .used(false)
                .build()
        );

        // ✅ Reuse existing EmailService
        emailService.sendOtp(email, otp);

        auditService.log(
            card.getId(),
            "OTP_SENT",
            "OTP sent for " + purpose
        );
    }

    /* ================= VERIFY OTP ================= */

    public void verifyOtp(VirtualCard card, String otp, String purpose) {

        CardOtp stored = otpRepository
            .findTopByCardIdAndPurposeAndUsedFalseOrderByIdDesc(
                card.getId(),
                purpose
            )
            .orElseThrow(() ->
                new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "OTP invalid"
                )
            );

        if (stored.getExpiryTime().isBefore(LocalDateTime.now())) {
            auditService.log(card.getId(), "OTP_EXPIRED", purpose);
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "OTP expired"
            );
        }

        if (!stored.getOtp().equals(otp)) {
            stored.setAttempts(stored.getAttempts() + 1);
            otpRepository.save(stored);

            if (stored.getAttempts() >= MAX_OTP_ATTEMPTS) {
                auditService.log(
                    card.getId(),
                    "OTP_BLOCKED",
                    "Too many invalid OTP attempts"
                );
            }

            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Invalid OTP"
            );
        }

        stored.setUsed(true);
        otpRepository.save(stored);

        auditService.log(
            card.getId(),
            "OTP_VERIFIED",
            "OTP verified for " + purpose
        );
    }
}
