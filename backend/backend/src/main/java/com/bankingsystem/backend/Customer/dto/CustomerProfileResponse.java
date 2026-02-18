package com.bankingsystem.backend.Customer.dto;


import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerProfileResponse {

    private String customerId;
    private String fullName;
    private String email;
    private String mobile;
    private LocalDate dob;
    private String gender;
    private String address;
    
    private String status;
}