package com.bankingsystem.backend.Staff.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String staffId;
    private String fullName;
    private LocalDate dob;
    private String gender;
    private String maritalStatus;

    private String email;
    private String mobile;
    private String address;

    private String salary;
    private String workSchedule;
    private String manager;
    private String notes;

    private String role; // ADMIN, MANAGER, TELLER etc
    private String photoPath;
    private String password;
    @Column(nullable = false)
    private boolean forcePasswordChange = true;

    private boolean deleted = false; // Soft delete / inactive
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    private String createdBy;
    private String updatedBy;
    private String deletedBy;

    // =====================
    // Helper Methods
    // =====================
    public void softDelete(String deletedByUser) {
        this.deleted = true;
        this.deletedAt = LocalDateTime.now();
        this.deletedBy = deletedByUser;
    }

    public void restore(String updatedByUser) {
        this.deleted = false;
        this.deletedAt = null;
        this.deletedBy = null;
        this.updatedAt = LocalDateTime.now();
        this.updatedBy = updatedByUser;
    }
}