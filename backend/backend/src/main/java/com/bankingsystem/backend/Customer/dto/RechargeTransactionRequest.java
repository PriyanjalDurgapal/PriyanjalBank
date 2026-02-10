package com.bankingsystem.backend.Customer.dto;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RechargeTransactionRequest {

    private String accountNumber;
    private String pin;
    private double amount;
    private String channel; // MOBILE, DTH, ELECTRICITY, WATER, TRANSFER
    private String serviceProvider;
}