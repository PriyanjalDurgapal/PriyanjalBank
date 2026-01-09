package com.bankingsystem.backend.Customer.service;

import java.util.List;

import com.bankingsystem.backend.Customer.dto.CreateCustomerRequest;
import com.bankingsystem.backend.Customer.dto.CustomerPageResponse;
import com.bankingsystem.backend.Customer.dto.UpdateCustomerRequest;
import com.bankingsystem.backend.Customer.entity.Customer;
import org.springframework.data.domain.Page;

public interface CustomerService {

    Customer createCustomer(CreateCustomerRequest request, String role);
    List<Customer>getallCustomers();
    Customer updateCustomer(Long id, UpdateCustomerRequest request, String performedBy);
    Customer deleteCustomer(Long id,String performedBy);

   Page<Customer> searchCustomers(
        String search,
        String status,
        int page,
        int size
);
}
