package com.bankingsystem.backend.Customer.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.Customer.dto.CreateCustomerRequest;
import com.bankingsystem.backend.Customer.dto.CustomerSuggestionResponse;
import com.bankingsystem.backend.Customer.dto.UpdateCustomerRequest;
import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.service.CustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/staff-customers")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')") //  ADMIN ONLY
public class CustomerController {

    private final CustomerService customerService;

    //  CREATE CUSTOMER
    @PostMapping("/add")
    public ResponseEntity<Customer> createCustomer(
            @Valid @RequestBody CreateCustomerRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                customerService.createCustomer(request, authentication.getName())
        );
    }

    //  GET ALL CUSTOMERS
    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getallCustomers());
    }

    // UPDATE CUSTOMER
    @PatchMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCustomerRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                customerService.updateCustomer(id, request, authentication.getName())
        );
    }

    //  DELETE CUSTOMER
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable Long id,
            Authentication authentication
    ) {
        customerService.deleteCustomer(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    //  SEARCH + PAGINATION
    @GetMapping
    public ResponseEntity<Page<Customer>> searchCustomers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(
                customerService.searchCustomers(search, status, page, size)
        );
    }

    //  AUTOCOMPLETE SUGGESTIONS
    @GetMapping("/suggestions")
    public ResponseEntity<List<CustomerSuggestionResponse>> suggestCustomers(
            @RequestParam String query
    ) {
        if (query.length() < 3) {
            return ResponseEntity.ok(List.of());
        }
        return ResponseEntity.ok(customerService.suggestCustomers(query));
    }
}
