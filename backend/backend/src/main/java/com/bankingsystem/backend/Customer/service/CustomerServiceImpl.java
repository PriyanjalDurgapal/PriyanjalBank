package com.bankingsystem.backend.Customer.service;

import com.bankingsystem.backend.Customer.dto.CreateCustomerRequest;
import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.common.util.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public Customer createCustomer(CreateCustomerRequest request, String role) {

        if (customerRepository.existsByMobile(request.getMobile())) {
            throw new RuntimeException("Mobile already exists");
        }

        if (request.getEmail() != null &&
            customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String customerId = generateCustomerId();
        String accountNumber = generateAccountNumber();
        String rawPassword = generateRandomPassword();

        Customer customer = Customer.builder()
                .customerId(customerId)
                .fullName(request.getFullName())
                .dob(request.getDob())
                .gender(request.getGender())
                .mobile(request.getMobile())
                .email(request.getEmail())
                .address(request.getAddress())
                .createdByRole(role)
                .accountNumber(accountNumber)
                .password(passwordEncoder.encode(rawPassword))
                .build();

        Customer saved = customerRepository.save(customer);

        if (saved.getEmail() != null) {
            emailService.sendCustomerCredentials(
                    saved.getEmail(),
                    customerId,
                    accountNumber,
                    rawPassword
            );
        }

        return saved;
    }

    private String generateCustomerId() {
        return "CUST" + System.currentTimeMillis();
    }

    private String generateAccountNumber() {
        return "1010" + (long) (Math.random() * 1_000_000_000L);
    }

    private String generateRandomPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
    
    @Override
    public List<Customer> getallCustomers(){
        return customerRepository.findAll();
    }
}
