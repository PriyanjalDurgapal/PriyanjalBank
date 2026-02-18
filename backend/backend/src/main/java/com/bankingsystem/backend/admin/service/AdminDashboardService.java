package com.bankingsystem.backend.admin.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bankingsystem.backend.admin.dto.AdminDashboardDTO;
import com.bankingsystem.backend.admin.repository.AccountRepository;
import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.atm.repository.AtmTransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {

    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;
    private final AtmTransactionRepository atmTransactionRepository;

    public AdminDashboardDTO getDashboardStats() {

        // Customer Stats
        Long totalCustomers = customerRepository.countByDeletedFalse();
        Long activeCustomers = customerRepository.countByStatusAndDeletedFalse("ACTIVE");
        Long inactiveCustomers = customerRepository.countByStatusAndDeletedFalse("INACTIVE");

        // Account Stats
        Long totalAccounts = accountRepository.count();
        Long activeAccounts = accountRepository.countByClosedFalse();
        Long closedAccounts = accountRepository.countByClosedTrue();
        Long frozenAccounts = accountRepository.countByFrozenTrue();

        // Transactions
        List<Object[]> depositsPerMonth = atmTransactionRepository.sumDepositsPerMonth();
        List<Object[]> withdrawalsPerMonth = atmTransactionRepository.sumWithdrawalsPerMonth();
        List<Object[]> newCustomersPerMonth = atmTransactionRepository.countNewCustomersPerMonth();

        // Convert results to arrays of 12 months
        double[] monthlyDeposits = new double[12];
        double[] monthlyWithdrawals = new double[12];
        long[] newCustomers = new long[12];

        depositsPerMonth.forEach(row -> {
            int month = ((Number) row[0]).intValue() - 1;
            monthlyDeposits[month] = ((Number) row[1]).doubleValue();
        });

        withdrawalsPerMonth.forEach(row -> {
            int month = ((Number) row[0]).intValue() - 1;
            monthlyWithdrawals[month] = ((Number) row[1]).doubleValue();
        });

        newCustomersPerMonth.forEach(row -> {
            int month = ((Number) row[0]).intValue() - 1;
            newCustomers[month] = ((Number) row[1]).longValue();
        });

        // Total Revenue = total deposits - total withdrawals
        double totalRevenue = java.util.Arrays.stream(monthlyDeposits).sum() - java.util.Arrays.stream(monthlyWithdrawals).sum();

        // Convert arrays to lists for DTO
        List<Double> monthlyDepositsList = Arrays.stream(monthlyDeposits).boxed().collect(Collectors.toList());
        List<Double> monthlyWithdrawalsList = Arrays.stream(monthlyWithdrawals).boxed().collect(Collectors.toList());
        List<Long> newCustomersList = Arrays.stream(newCustomers).boxed().collect(Collectors.toList());

        return AdminDashboardDTO.builder()
                .totalCustomers(totalCustomers)
                .activeCustomers(activeCustomers)
                .inactiveCustomers(inactiveCustomers)
                .totalAccounts(totalAccounts)
                .activeAccounts(activeAccounts)
                .closedAccounts(closedAccounts)
                .frozenAccounts(frozenAccounts)
                .monthlyDeposits(monthlyDepositsList)
                .monthlyWithdrawals(monthlyWithdrawalsList)
                .newCustomersPerMonth(newCustomersList)
                .totalRevenue(totalRevenue)
                .build();
    }
}