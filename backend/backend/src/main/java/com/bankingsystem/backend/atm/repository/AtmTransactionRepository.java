package com.bankingsystem.backend.atm.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.atm.entity.AtmTransaction;

public interface AtmTransactionRepository
        extends JpaRepository<AtmTransaction, Long> {

    List<AtmTransaction> findByAccountNumberOrderByCreatedAtDesc(
            String accountNumber
    );
    
}
