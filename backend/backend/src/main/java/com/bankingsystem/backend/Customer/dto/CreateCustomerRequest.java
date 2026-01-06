package com.bankingsystem.backend.Customer.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateCustomerRequest {

    private String fullName;
    private LocalDate dob;
    private String gender;
    private String mobile;
    private String email;
    private String address;
}