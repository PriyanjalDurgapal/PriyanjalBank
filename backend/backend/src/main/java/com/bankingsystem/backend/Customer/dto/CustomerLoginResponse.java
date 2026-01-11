package com.bankingsystem.backend.Customer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomerLoginResponse {
    private String token;
    private String role;
}
