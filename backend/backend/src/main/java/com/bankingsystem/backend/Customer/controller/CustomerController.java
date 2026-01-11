package com.bankingsystem.backend.Customer.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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

 @PatchMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCustomerRequest request,
            @RequestHeader("X-ROLE") String user
    ) {
        return ResponseEntity.ok(
                customerService.updateCustomer(id, request, user)
        );
    }
 @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable Long id,
            @RequestHeader("X-ROLE") String user
    ) {
        customerService.deleteCustomer(id, user);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
@PreAuthorize("hasRole('ADMIN')")
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
