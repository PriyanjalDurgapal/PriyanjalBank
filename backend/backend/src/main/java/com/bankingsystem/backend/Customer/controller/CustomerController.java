package com.bankingsystem.backend.Customer.controller;

import com.bankingsystem.backend.Customer.dto.CreateCustomerRequest;
import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.service.CustomerService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/add")
    
    public ResponseEntity<Customer> createCustomer(
            @RequestBody CreateCustomerRequest request,
            @RequestHeader("X-ROLE") String role
    ) {
        System.out.println(request);
        return ResponseEntity.ok(customerService.createCustomer(request, role));
    }
@GetMapping("/all")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<List<Customer>> getAllCustomers() {
    return ResponseEntity.ok(customerService.getallCustomers());
}



}
