package com.bankingsystem.backend.Staff.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bankingsystem.backend.Staff.dto.ChangePasswordRequest;
import com.bankingsystem.backend.Staff.dto.StaffLoginRequest;
import com.bankingsystem.backend.Staff.dto.StaffLoginResponse;
import com.bankingsystem.backend.Staff.services.StaffAuthService;


@RestController
@RequestMapping("/api/staff-auth")
@RequiredArgsConstructor
public class StaffAuthController {

    private final StaffAuthService staffAuthService;

    @PostMapping("/login")
    public StaffLoginResponse login(
            @RequestBody StaffLoginRequest request,
            HttpServletRequest httpRequest
    ) {

        String ip = httpRequest.getRemoteAddr();
        return staffAuthService.login(request, ip);
    }
@PostMapping("/change-password")
public ResponseEntity<?> changePassword(
        @RequestBody ChangePasswordRequest request,
        Principal principal,
        HttpServletRequest httpRequest) {

    System.out.println("CHANGE PASSWORD HIT");

    if (principal == null) {
        System.out.println("PRINCIPAL IS NULL");
        return ResponseEntity.status(401).body("Not authenticated");
    }

    staffAuthService.changePassword(
            principal.getName(),
            request,
            httpRequest.getRemoteAddr()
    );

    return ResponseEntity.ok("Password changed successfully");
}
}