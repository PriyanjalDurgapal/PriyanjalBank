package com.bankingsystem.backend.Customer.dto;

import lombok.Data;

@Data
public class CustomerLoginRequest {

    String customerId;
    String password;
    
}
