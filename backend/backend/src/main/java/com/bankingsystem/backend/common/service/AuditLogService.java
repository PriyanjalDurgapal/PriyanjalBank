package com.bankingsystem.backend.common.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.bankingsystem.backend.common.Entity.AuditLog;
import com.bankingsystem.backend.common.repository.AuditLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository repository;

    public void log(String email, String role, String action, String ip) {
        repository.save(
            AuditLog.builder()
                .email(email)
                .role(role)
                .action(action)
                .ipAddress(ip)
                .createdAt(LocalDateTime.now())
                .build()
        );
    }
}
