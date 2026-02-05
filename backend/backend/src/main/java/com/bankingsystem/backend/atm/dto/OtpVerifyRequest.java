package com.bankingsystem.backend.atm.dto;

import lombok.Data;

@Data
public class OtpVerifyRequest {
    private String accountNumber;
    private String otp;
}