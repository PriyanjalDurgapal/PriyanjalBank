package com.bankingsystem.backend.card.repository;

import com.bankingsystem.backend.card.entity.CardAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardAuditLogRepository extends JpaRepository<CardAuditLog, Long> {
    List<CardAuditLog> findByCardIdOrderByCreatedAtDesc(Long cardId);
}
