package com.bankingsystem.backend.atm.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bankingsystem.backend.atm.entity.AtmTransaction;

public interface AtmTransactionRepository
        extends JpaRepository<AtmTransaction, Long> {

    List<AtmTransaction> findByAccountNumberOrderByCreatedAtDesc(
            String accountNumber
    );
@Query("""
    SELECT EXTRACT(MONTH FROM t.createdAt), SUM(t.amount)
    FROM AtmTransaction t
    WHERE t.type = com.bankingsystem.backend.atm.enums.TransactionType.DEPOSIT
    GROUP BY EXTRACT(MONTH FROM t.createdAt)
    ORDER BY EXTRACT(MONTH FROM t.createdAt)
""")
List<Object[]> sumDepositsPerMonth();

@Query("""
    SELECT EXTRACT(MONTH FROM t.createdAt), SUM(t.amount)
    FROM AtmTransaction t
    WHERE t.type = com.bankingsystem.backend.atm.enums.TransactionType.WITHDRAW
    GROUP BY EXTRACT(MONTH FROM t.createdAt)
    ORDER BY EXTRACT(MONTH FROM t.createdAt)
""")
List<Object[]> sumWithdrawalsPerMonth();
    // Count new customers per month (based on account creation)
    @Query("""
        SELECT EXTRACT(MONTH FROM a.createdAt), COUNT(a)
        FROM com.bankingsystem.backend.admin.entity.Account a
        GROUP BY EXTRACT(MONTH FROM a.createdAt)
        ORDER BY EXTRACT(MONTH FROM a.createdAt)
    """)
    List<Object[]> countNewCustomersPerMonth();

    
}
