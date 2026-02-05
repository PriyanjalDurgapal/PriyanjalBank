package com.bankingsystem.backend.Customer.dto;
import java.time.LocalDateTime;

import com.bankingsystem.backend.atm.enums.TransactionChannel;

import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerTransactionHistoryDto {

    private Long id;
    private String type;
    private double amount;
    private double balanceAfter;
    private TransactionChannel channel;
    private String serviceProvider;
    private LocalDateTime createdAt;
}