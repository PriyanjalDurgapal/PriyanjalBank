package com.bankingsystem.backend.Customer.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "archived_customers")
@Builder
@Getter
@Setter
public class ArchivedCustomer {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private Long originalCustomerId;

    private String customerId;
    private String fullName;
    private LocalDate dob;
    private String gender;
    private String mobile;
    private String email;
    private String address;
    private String accountNumber;
    private String status;

    private String deletedBy;
    private LocalDateTime deletedAt;
}
