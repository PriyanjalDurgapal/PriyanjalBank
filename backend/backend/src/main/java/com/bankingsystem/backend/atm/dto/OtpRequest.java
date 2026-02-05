package com.bankingsystem.backend.atm.dto;


import lombok.Setter;
import lombok.Getter;

@Getter @Setter
public class OtpRequest {
    private String accountNumber;
    private String email;
}
