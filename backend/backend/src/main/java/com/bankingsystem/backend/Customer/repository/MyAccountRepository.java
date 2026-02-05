package com.bankingsystem.backend.Customer.repository;





import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.admin.entity.Account;

//taking account from admin/account

public interface MyAccountRepository extends JpaRepository<Account, Long> {

    List<Account> findByCustomerIdAndClosedFalse(Long customerId);
}