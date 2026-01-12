package com.bankingsystem.backend.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.common.Entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByEmailOrderByCreatedAtDesc(String email);
}
