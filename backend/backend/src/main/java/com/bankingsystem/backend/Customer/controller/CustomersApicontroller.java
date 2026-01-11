package com.bankingsystem.backend.Customer.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.Customer.dto.CustomerLoginRequest;
import com.bankingsystem.backend.Customer.dto.CustomerLoginResponse;
import com.bankingsystem.backend.Customer.service.CustomerApiServices;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomersApicontroller {
    private final CustomerApiServices customerApiServices;

    @PostMapping("/login")
    public CustomerLoginResponse login(@RequestBody CustomerLoginRequest request){
        return customerApiServices.login(request);
    }
}
