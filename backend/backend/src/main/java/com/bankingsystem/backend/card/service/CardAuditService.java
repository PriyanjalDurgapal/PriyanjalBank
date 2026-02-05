package com.bankingsystem.backend.card.service;

import com.bankingsystem.backend.card.entity.CardAuditLog;
import com.bankingsystem.backend.card.repository.CardAuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardAuditService {

    private final CardAuditLogRepository repo;

    public void log(Long cardId, String action, String description) {
        repo.save(
            CardAuditLog.builder()
                .cardId(cardId)
                .action(action)
                .description(description)
                .build()
        );
    }
}
