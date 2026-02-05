package com.bankingsystem.backend.atm.dto;
import lombok.Setter;

import com.bankingsystem.backend.atm.enums.TransactionChannel;

import lombok.Getter;

@Getter @Setter
public class TransactionRequest {
    private String accountNumber;
    private String otp;
    private String type;
    private double amount;
      private TransactionChannel channel;
    private String serviceProvider;
}
