package com.bankingsystem.backend.card.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "card_requests")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerRefId;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String rejectionReason;
    private LocalDateTime createdAt;
    private LocalDateTime decisionAt;

    public enum Status {
        PENDING, APPROVED, REJECTED
    }

    @PrePersist
    void onCreate() {
        status = Status.PENDING;
        createdAt = LocalDateTime.now();
    }
}
