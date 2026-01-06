package com.bankingsystem.backend.Customer.service;

import com.bankingsystem.backend.Customer.dto.CreateCustomerRequest;
import com.bankingsystem.backend.Customer.entity.Customer;
public interface CustomerService {

    Customer createCustomer(CreateCustomerRequest request, String role);
}
