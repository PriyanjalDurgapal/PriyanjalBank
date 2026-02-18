package com.bankingsystem.backend.Customer.service;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.admin.entity.Account;
import com.bankingsystem.backend.admin.repository.AccountRepository;
import com.bankingsystem.backend.atm.entity.AtmTransaction;
import com.bankingsystem.backend.atm.enums.TransactionChannel;
import com.bankingsystem.backend.atm.enums.TransactionType;
import com.bankingsystem.backend.atm.repository.AtmTransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final AccountRepository accountRepository;
    private final AtmTransactionRepository transactionRepository;

    @Transactional
    public AtmTransaction debit(
            String accountNumber,
            double amount,
            TransactionChannel channel,
            String provider
    ) {

        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Account not found"
                        )
                );

        if (account.getBalance() < amount) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Insufficient balance"
            );
        }

        account.setBalance(account.getBalance() - amount);

        AtmTransaction tx = AtmTransaction.builder()
                .accountNumber(accountNumber)
                .type(TransactionType.WITHDRAW)
                .amount(amount)
                .balanceAfter(account.getBalance())
                .channel(channel)
                .serviceProvider(provider)
                .createdAt(LocalDateTime.now())
                .build();

        accountRepository.save(account);
        return transactionRepository.save(tx);
    }
}