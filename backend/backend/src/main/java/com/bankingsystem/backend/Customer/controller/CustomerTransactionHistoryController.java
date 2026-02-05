package com.bankingsystem.backend.Customer.controller;



import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.bankingsystem.backend.Customer.dto.CustomerTransactionHistoryDto;
import com.bankingsystem.backend.Customer.service.CustomerTransactionHistoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customer/transactions")
@RequiredArgsConstructor
public class CustomerTransactionHistoryController {

    private final CustomerTransactionHistoryService service;

    @GetMapping
    public List<CustomerTransactionHistoryDto>
    getMyTransactions(Authentication authentication) {

        return service.getMyTransactions(authentication);
    }
}