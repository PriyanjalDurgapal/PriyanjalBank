package com.bankingsystem.backend.Staff.controller;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.bankingsystem.backend.Staff.dto.StaffProfileResponse;
import com.bankingsystem.backend.Staff.entity.Staff;
import com.bankingsystem.backend.Staff.repository.StaffRepository;


@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffRepository staffRepository;

    @GetMapping("/profile")
    public ResponseEntity<StaffProfileResponse> getProfile(Authentication authentication) {

        String email = authentication.getName();

        Staff staff = staffRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        StaffProfileResponse response = new StaffProfileResponse(
                staff.getFullName(),
                staff.getEmail(),
                staff.getRole(),
                staff.getPhotoPath(),
                Boolean.TRUE.equals(staff.isForcePasswordChange())
        );

        return ResponseEntity.ok(response);
    }
}