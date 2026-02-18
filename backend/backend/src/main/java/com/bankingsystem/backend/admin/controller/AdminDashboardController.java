package com.bankingsystem.backend.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import com.bankingsystem.backend.admin.dto.AdminDashboardDTO;
import com.bankingsystem.backend.admin.service.AdminDashboardService;

@RestController
@RequestMapping("api/common")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService service;

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardDTO> getDashboard() {
        return ResponseEntity.ok(service.getDashboardStats());
    }
}