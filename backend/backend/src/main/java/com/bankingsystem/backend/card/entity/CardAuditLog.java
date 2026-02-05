package com.bankingsystem.backend.card.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "card_audit_logs")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardAuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long cardId;

    @Column(nullable = false)
    private String action;

    private String description;

    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
