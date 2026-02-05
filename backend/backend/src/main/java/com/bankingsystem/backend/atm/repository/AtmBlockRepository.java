package com.bankingsystem.backend.atm.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.atm.entity.AtmBlock;

public interface AtmBlockRepository extends JpaRepository<AtmBlock, Long> {

    Optional<AtmBlock> findByAccountNumber(String accountNumber);
}
