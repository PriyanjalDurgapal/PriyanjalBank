package com.bankingsystem.backend.admin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.admin.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

    List<Account> findByCustomerIdAndClosedFalse(Long customerId);
    Optional<Account> findByCustomerId(Long customerId);
    boolean existsByCustomerIdAndTypeAndClosedFalse(Long customerId, String type);
    Optional<Account> findByAccountNumber(String accountNumber);

    // Counts for dashboard
    Long countByClosedFalse();     // Active accounts
    Long countByClosedTrue();      // Closed accounts
    Long countByFrozenTrue();      // Frozen accounts
}