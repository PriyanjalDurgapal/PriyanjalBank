package com.bankingsystem.backend.admin.service;



import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.bankingsystem.backend.admin.entity.Account;
import com.bankingsystem.backend.admin.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminAccountService {

    private final AccountRepository repo;

    public Account create(Long customerId, String type) {

        if (repo.existsByCustomerIdAndTypeAndClosedFalse(customerId, type)) {
            throw new RuntimeException(type + " account already exists");
        }

        Account acc = Account.builder()
                .customerId(customerId)
                .accountNumber(generate())
                .type(type)
                .build();

        return repo.save(acc);
    }

    public List<Account> list(Long customerId) {
        return repo.findByCustomerIdAndClosedFalse(customerId);
    }

    public void freeze(Long id) {
        Account acc = repo.findById(id).orElseThrow();
        acc.setFrozen(true);
        repo.save(acc);
    }

    public void unfreeze(Long id) {
        Account acc = repo.findById(id).orElseThrow();
        acc.setFrozen(false);
        repo.save(acc);
    }

    public void close(Long id) {
        Account acc = repo.findById(id).orElseThrow();
        acc.setClosed(true);
        repo.save(acc);
    }

    private String generate() {
        return "2020" + (long)(Math.random() * 1_000_000_000L);
    }
}
