package com.bankingsystem.backend.common.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.common.Entity.PasswordResetOtp;


public interface PasswordResetOtpRepository
        extends JpaRepository<PasswordResetOtp, Long> {

    Optional<PasswordResetOtp>
    findTopByEmailAndUsedFalseOrderByIdDesc(String email);
}
