package com.bankingsystem.backend.Customer.service;

import java.util.List;


import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.bankingsystem.backend.Customer.dto.CustomerTransactionHistoryDto;
import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.admin.entity.Account;
import com.bankingsystem.backend.admin.repository.AccountRepository;
import com.bankingsystem.backend.atm.entity.AtmTransaction;
import com.bankingsystem.backend.atm.repository.AtmTransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerTransactionHistoryService {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final AtmTransactionRepository atmTransactionRepository;

    public List<CustomerTransactionHistoryDto>
    getMyTransactions(Authentication authentication) {

        String email = authentication.getName();

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        
        Account account = accountRepository
                .findByCustomerId(customer.getId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        String accountNumber = account.getAccountNumber();

        List<AtmTransaction> transactions =
                atmTransactionRepository
                        .findByAccountNumberOrderByCreatedAtDesc(accountNumber);

        return transactions.stream()
        .map(tx -> CustomerTransactionHistoryDto.builder()
                .id(tx.getId())
                .type(tx.getType().name()) 
                .amount(tx.getAmount())
                .balanceAfter(tx.getBalanceAfter())
                .channel(tx.getChannel())
                .serviceProvider(tx.getServiceProvider())
                .createdAt(tx.getCreatedAt())
                .build())
        .toList();
    }
}