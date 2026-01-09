package com.bankingsystem.backend.Customer.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.Customer.entity.CustomerAuditLog;
public interface CustomerAuditLogRepository
        extends JpaRepository<CustomerAuditLog, Long> {}
