package com.bankingsystem.backend.Customer.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.Customer.dto.RechargeTransactionRequest;
import com.bankingsystem.backend.Customer.service.CardverifiactionPinService;
import com.bankingsystem.backend.Customer.service.TransactionService;
import com.bankingsystem.backend.admin.entity.Account;
import com.bankingsystem.backend.admin.service.AdminAccountService;
import com.bankingsystem.backend.atm.enums.TransactionChannel;

import lombok.RequiredArgsConstructor;




@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final CardverifiactionPinService pinService;
    private final TransactionService transactionService;
    
    @PostMapping("/debit")
    public ResponseEntity<?> debit(
            @RequestBody RechargeTransactionRequest req
    ) {

        // Verify PIN
        pinService.verifyPin(req.getAccountNumber(), req.getPin());

        //  Debit Account
        return ResponseEntity.ok(
                transactionService.debit(
                        req.getAccountNumber(),
                        req.getAmount(),
                        TransactionChannel.valueOf(req.getChannel()),
                        req.getServiceProvider()
                )
        );
    }

}
