package com.bankingsystem.backend.Customer.service;

import java.time.LocalDateTime;

import com.bankingsystem.backend.Customer.dto.CreateCustomerRequest;
import com.bankingsystem.backend.Customer.dto.CustomerSuggestionResponse;
import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.common.util.EmailService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.*;
import java.util.List;
import java.util.UUID;

import com.bankingsystem.backend.Customer.dto.UpdateCustomerRequest;
import com.bankingsystem.backend.Customer.entity.ArchivedCustomer;
import com.bankingsystem.backend.Customer.repository.ArchivedCustomerRepository;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final ArchivedCustomerRepository archivedCustomerRepository; 
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


@Override
public Customer updateCustomer(Long id, UpdateCustomerRequest request, String performedBy) {

    Customer customer = customerRepository.findByIdAndDeletedFalse(id)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

    customer.setFullName(request.getFullName());
    customer.setGender(request.getGender());
    customer.setStatus(request.getStatus());

    customer.setUpdatedBy(performedBy);
    customer.setUpdatedAt(LocalDateTime.now());

    Customer saved = customerRepository.save(customer);

    //  Email notification
    try {
        if (saved.getEmail() != null) {
            emailService.sendMail(
                    saved.getEmail(),
                    "Profile Updated",
                    "Dear " + saved.getFullName() +
                    ",\n\nYour customer profile has been updated.\n\nRegards,\nBank Team"
            );
        }
    } catch (Exception e) {
       
        System.err.println("Email sending failed for customer: " + saved.getId());
        e.printStackTrace();
    }

    return saved;
}

@Override
public Customer deleteCustomer(Long id, String performedBy) {

    Customer customer = customerRepository.findByIdAndDeletedFalse(id)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

    //  Archive before delete
    ArchivedCustomer archive = ArchivedCustomer.builder()
            .originalCustomerId(customer.getId())
            .customerId(customer.getCustomerId())
            .accountNumber(customer.getAccountNumber())
            .fullName(customer.getFullName())
            .gender(customer.getGender())
            .dob(customer.getDob())
            .mobile(customer.getMobile())
            .email(customer.getEmail())
            .address(customer.getAddress())
            .status(customer.getStatus())
            .deletedBy(performedBy)
            .deletedAt(LocalDateTime.now())
            .build();

    archivedCustomerRepository.save(archive);

    //  Soft delete
    customer.setDeleted(true);
    customer.setDeletedBy(performedBy);
    customer.setDeletedAt(LocalDateTime.now());

    Customer saved = customerRepository.save(customer);

    //  Email notification
    try {
        if (saved.getEmail() != null) {
            emailService.sendMail(
                    saved.getEmail(),
                    "Account Deactivated",
                    "Dear " + saved.getFullName() +
                            ",\n\nYour account has been deactivated.\n\nRegards,\nBank Team"
            );
        }
    } catch (Exception e) {
        System.err.println("Email sending failed for customer: " + saved.getId());
    }

    return saved;
}
@Override
public Page<Customer> searchCustomers(
        String search,
        String status,
        int page,
        int size
) {
    Pageable pageable = PageRequest.of(page, size);
    return customerRepository.searchCustomers(search, status, pageable);
}

public List<CustomerSuggestionResponse> suggestCustomers(String query) {
    return customerRepository.suggestCustomers(
            query,
            PageRequest.of(0, 5) 
    );
}


}
