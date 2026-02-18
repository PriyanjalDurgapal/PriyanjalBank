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
@RequestMapping("/api/my_logs")
@RequiredArgsConstructor
public class CustomerAuditLogController {

    private final AuditLogRepository auditLogRepository;
    

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER','STAFF')")
    public List<AuditLog> myLogs(Authentication auth) {
        String email = auth.getName();
String role = auth.getAuthorities()
            .stream()
            .findFirst()
            .orElseThrow()
            .getAuthority()
            .replace("ROLE_", "");

    return auditLogRepository
            .findByEmailAndRoleOrderByCreatedAtDesc(email, role);
}
}
