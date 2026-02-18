package com.bankingsystem.backend.atm.entity;

import java.time.LocalDateTime;

import com.bankingsystem.backend.atm.enums.TransactionChannel;
import com.bankingsystem.backend.atm.enums.TransactionType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "atm_transactions")
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
public class AtmTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountNumber;
   @Enumerated(EnumType.STRING)
private TransactionType type;

    private double amount;
    private double balanceAfter;
    
    @Enumerated(EnumType.STRING)
    private TransactionChannel channel;

    
    private String serviceProvider; 
   


    private LocalDateTime createdAt;
    @PrePersist
protected void onCreate() {
    this.createdAt = LocalDateTime.now();
}
}
