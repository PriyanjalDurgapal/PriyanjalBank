package com.bankingsystem.backend.admin.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import com.bankingsystem.backend.atm.entity.AtmTransaction;

public interface TransactionRepository extends JpaRepository<AtmTransaction, Long> {

    //  Count total transactions grouped by month
    @Query("""
        SELECT MONTH(t.createdAt), COUNT(t)
        FROM AtmTransaction t
        GROUP BY MONTH(t.createdAt)
        ORDER BY MONTH(t.createdAt)
    """)
    List<Object[]> countMonthlyTransactions();


    //  Sum monthly deposits
    @Query("""
        SELECT MONTH(t.createdAt), SUM(t.amount)
        FROM AtmTransaction t
        WHERE t.type = com.bankingsystem.backend.atm.enums.TransactionType.DEPOSIT
        GROUP BY MONTH(t.createdAt)
        ORDER BY MONTH(t.createdAt)
    """)
    List<Object[]> sumMonthlyDeposits();


    //  Sum monthly withdrawals
    @Query("""
        SELECT MONTH(t.createdAt), SUM(t.amount)
        FROM AtmTransaction t
        WHERE t.type = com.bankingsystem.backend.atm.enums.TransactionType.WITHDRAW
        GROUP BY MONTH(t.createdAt)
        ORDER BY MONTH(t.createdAt)
    """)
    List<Object[]> sumMonthlyWithdrawals();


    // Total revenue (example: assume revenue from serviceProvider fees or withdrawals)
    @Query("""
        SELECT SUM(t.amount)
        FROM AtmTransaction t
        WHERE t.type = com.bankingsystem.backend.atm.enums.TransactionType.WITHDRAW
    """)
    Double totalRevenue();
}