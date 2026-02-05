package com.bankingsystem.backend.card.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.card.entity.CardOtp;

public interface CardOtpRepository extends JpaRepository<CardOtp, Long> {

    Optional<CardOtp> findTopByCardIdAndPurposeAndUsedFalseOrderByIdDesc(
        Long cardId,
        String purpose
    );
}
