package com.bankingsystem.backend.atm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bankingsystem.backend.atm.service.AtmService;
import com.bankingsystem.backend.atm.dto.PinVerifyRequest;
import com.bankingsystem.backend.atm.dto.OtpRequest;
import com.bankingsystem.backend.atm.dto.OtpVerifyRequest;
import com.bankingsystem.backend.atm.dto.TransactionRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/atm")
@RequiredArgsConstructor
public class AtmController {

    private final AtmService atmService;

    // -----------------------------------------
    // STEP 1: VERIFY PIN
    // -----------------------------------------
    @PostMapping("/verify-pin")
    public ResponseEntity<Void> verifyPin(
            @RequestBody PinVerifyRequest request
    ) {
        atmService.verifyPin(
                request.getAccountNumber(),
                request.getPin()
        );
        return ResponseEntity.ok().build();
    }

    // -----------------------------------------
    // STEP 2: SEND OTP
    // -----------------------------------------
    @PostMapping("/send-otp")
    public ResponseEntity<Void> sendOtp(
            @RequestBody OtpRequest request
    ) {
        atmService.sendOtp(
                request.getAccountNumber()
                
        );
        return ResponseEntity.ok().build();
    }

    // -----------------------------------------
    // STEP 3: DEPOSIT / WITHDRAW
    // -----------------------------------------
    @PostMapping("/transaction")
    public ResponseEntity<Void> transaction(
            @RequestBody TransactionRequest request
    ) {
       atmService.processTransaction(
        request.getAccountNumber(),
        request.getOtp(),
        request.getType(),
        request.getAmount(),
        request.getChannel(),
        request.getServiceProvider()
);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
        // -----------------------------------------
    // NEW: VERIFY OTP BEFORE TRANSACTION SCREEN
    // -----------------------------------------
    @PostMapping("/verify-otp")
    public ResponseEntity<Void> verifyOtp(
            @RequestBody OtpVerifyRequest request
    ) {
        atmService.verifyOtp(
                request.getAccountNumber(),
                request.getOtp()
        );
        return ResponseEntity.ok().build();
    }
}
