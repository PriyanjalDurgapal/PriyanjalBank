package com.bankingsystem.backend.Customer.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCustomerRequest {

    @NotBlank
    private String fullName;

    @NotBlank
    private String gender;

    @NotBlank
    private String status;
}
