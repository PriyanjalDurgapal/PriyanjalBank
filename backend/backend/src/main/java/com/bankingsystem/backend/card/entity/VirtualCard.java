package com.bankingsystem.backend.card.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "virtual_cards")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VirtualCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long customerRefId;

    private String cardNumber;
    private String maskedNumber;
    private String cvv;
    private LocalDate expiryDate;

    private boolean active;
    private boolean onlineEnabled;
    private boolean internationalEnabled;
    private boolean locked;

    private String pinHash;
    private boolean pinSet;
    private int failedPinAttempts;

    private double dailyLimit;
    private boolean softDeleted;
    private LocalDate createdAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDate.now();
        active = true;
        softDeleted = false;
    }
}
