package com.bankingsystem.backend.Customer.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String customerId;

    @Column(nullable = false)
    private String fullName;

    private LocalDate dob;
    private String gender;

    @Column(nullable = false, unique = true)
    private String mobile;

    @Column(unique = true)
    private String email;

    private String address;

    @Column(nullable = false)
    private String status; 

    @Column(nullable = false)
    private String createdByRole; 

    @Column(nullable = false, unique = true)
    private String accountNumber;

    @Column(nullable = false)
    private String password; 

    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.status = "ACTIVE";
    }
}
