package com.bankingsystem.backend.admin.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminDashboardDTO {

    // Customer Stats
    private Long totalCustomers;
    private Long activeCustomers;
    private Long inactiveCustomers;

    // Account Stats
    private Long totalAccounts;
    private Long activeAccounts;
    private Long closedAccounts;
    private Long frozenAccounts;

    // for my Charts
    private List<Long> monthlyTransactions;
    private List<Double> monthlyDeposits;
    private List<Double> monthlyWithdrawals;
    private List<Long> newCustomersPerMonth;

    // Revenue
    private Double totalRevenue;
}