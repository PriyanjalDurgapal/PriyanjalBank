package com.bankingsystem.backend.card.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "card_otps")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long cardId;

    @Column(nullable = false)
    private String otp;

    @Column(nullable = false)
    private String purpose; // SET_PIN, RESET_PIN

    @Column(nullable = false)
    private LocalDateTime expiryTime;

    @Column(nullable = false)
    private int attempts;

    @Column(nullable = false)
    private boolean used;
}
