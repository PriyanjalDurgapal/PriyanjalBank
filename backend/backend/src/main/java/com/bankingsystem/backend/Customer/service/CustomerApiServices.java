package com.bankingsystem.backend.Customer.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.Customer.dto.CustomerLoginRequest;
import com.bankingsystem.backend.Customer.dto.CustomerLoginResponse;
import com.bankingsystem.backend.Customer.dto.CustomerProfileResponse;
import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.auth.JwtUtil;
import com.bankingsystem.backend.common.service.AuditLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerApiServices {

    private final CustomerRepository customerRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;

    // ================= LOGIN =================
    public CustomerLoginResponse login(CustomerLoginRequest request, String ip) {

        Customer customer;

        // -------- Customer ID not found --------
        customer = customerRepository.findByCustomerId(request.getCustomerId())
                .orElseThrow(() -> {
                    auditLogService.log(
                            request.getCustomerId(),
                            "CUSTOMER",
                            "LOGIN_FAILED_NOT_FOUND",
                            ip
                    );
                    return new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Customer ID not found"
                    );
                });

        // -------- Account inactive --------
        if (!"ACTIVE".equalsIgnoreCase(customer.getStatus())) {
            auditLogService.log(
                    customer.getEmail(),
                    customer.getRole(),
                    "LOGIN_BLOCKED_INACTIVE",
                    ip
            );
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Customer is inactive. Please contact the bank"
            );
        }

        // -------- Wrong password --------
        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            auditLogService.log(
                    customer.getEmail(),
                    customer.getRole(),
                    "LOGIN_FAILED_INVALID_PASSWORD",
                    ip
            );
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid Customer ID or Password"
            );
        }

        // -------- on Login success --------
        try {
            String token = jwtUtil.generateToken(
                    customer.getEmail(),
                    customer.getRole()
            );

            auditLogService.log(
                    customer.getEmail(),
                    customer.getRole(),
                    "LOGIN_SUCCESS",
                    ip
            );

            return new CustomerLoginResponse(token, customer.getRole());

        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Token generation failed"
            );
        }
    }

    // ================= GET PROFILE =================
//     public Customer getProfileByEmail(String email) {
//         return customerRepository.findByEmail(email)
//                 .orElseThrow(() -> new ResponseStatusException(
//                         HttpStatus.NOT_FOUND,
//                         "Customer not found"
//                 ));
//     }
public CustomerProfileResponse getProfileByEmail(String email) {

    Customer customer = customerRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Customer not found"
            ));

    return CustomerProfileResponse.builder()
            .customerId(customer.getCustomerId())
            .fullName(customer.getFullName())
            .email(customer.getEmail())
            .mobile(customer.getMobile())
            .dob(customer.getDob())
            .gender(customer.getGender())
            .address(customer.getAddress())
            .accountNumber(customer.getAccountNumber())
            .status(customer.getStatus())
            .build();
}
}
