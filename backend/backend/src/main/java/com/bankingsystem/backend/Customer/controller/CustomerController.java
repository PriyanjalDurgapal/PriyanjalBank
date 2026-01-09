package com.bankingsystem.backend.Customer.controller;

import com.bankingsystem.backend.Customer.dto.CreateCustomerRequest;
import com.bankingsystem.backend.Customer.dto.UpdateCustomerRequest;
import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.service.CustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;

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

}
