package com.bankingsystem.backend.admin.entity;



import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "accounts")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;

    @Column(unique = true, nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private String type; // SAVINGS / CURRENT

    private double balance;

    private boolean frozen;

    private boolean closed;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
        balance = 0;
        frozen = false;
        closed = false;
    }
}
