package com.bankingsystem.backend.atm.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.atm.entity.AtmOtp;

public interface AtmOtpRepository extends JpaRepository<AtmOtp, Long> {

    Optional<AtmOtp> findByAccountNumberAndOtpAndUsedFalse(
            String accountNumber,
            String otp
    );
}
