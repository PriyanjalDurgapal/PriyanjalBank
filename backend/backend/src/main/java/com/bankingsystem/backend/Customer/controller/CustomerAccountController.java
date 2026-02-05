package com.bankingsystem.backend.Customer.controller;



import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.admin.entity.Account;
import com.bankingsystem.backend.admin.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customer/accounts")
@RequiredArgsConstructor
public class CustomerAccountController {

    private final AccountRepository accountRepo;
    private final CustomerRepository customerRepo;

    @GetMapping
    public List<Account> myAccounts() {

        String email = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        Long customerId = customerRepo
                .findByEmail(email)
                .orElseThrow()
                .getId();

        return accountRepo.findByCustomerIdAndClosedFalse(customerId);
    }
}
