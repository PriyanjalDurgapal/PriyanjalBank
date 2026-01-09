package com.bankingsystem.backend.Customer.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.Customer.entity.ArchivedCustomer;

public interface ArchivedCustomerRepository
        extends JpaRepository<ArchivedCustomer, Long> {}

