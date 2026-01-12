package com.bankingsystem.backend.common.controller;



import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.common.service.ForgotPasswordService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService service;

    @PostMapping("/forgot-password")
    public void sendOtp(
            @RequestParam String email,
            HttpServletRequest request
    ) {
        service.sendOtp(email, request.getRemoteAddr());
    }

    @PostMapping("/reset-password")
    public void resetPassword(
            @RequestParam String email,
            @RequestParam String otp,
            @RequestParam String newPassword,
            HttpServletRequest request
    ) {
        service.resetPassword(
                email,
                otp,
                newPassword,
                request.getRemoteAddr()
        );
    }
}
