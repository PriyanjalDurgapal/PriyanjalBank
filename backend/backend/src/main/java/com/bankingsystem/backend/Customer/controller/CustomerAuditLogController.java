package com.bankingsystem.backend.Customer.controller;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.common.Entity.AuditLog;
import com.bankingsystem.backend.common.repository.AuditLogRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customer/logs")
@RequiredArgsConstructor
public class CustomerAuditLogController {

    private final AuditLogRepository auditLogRepository;

    @GetMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public List<AuditLog> myLogs(Authentication auth) {
        return auditLogRepository
                .findByEmailOrderByCreatedAtDesc(auth.getName());
    }
}
