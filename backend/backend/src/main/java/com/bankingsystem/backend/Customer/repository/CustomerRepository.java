package com.bankingsystem.backend.Customer.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.Customer.entity.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByMobile(String mobile);
    boolean existsByEmail(String email);
}
