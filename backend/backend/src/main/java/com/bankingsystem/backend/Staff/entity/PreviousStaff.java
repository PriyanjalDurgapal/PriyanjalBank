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
@Table(name = "previous_staff")
public class PreviousStaff {

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

    private String role;
    private String photoPath;
    private String password;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    private String createdBy;
    private String updatedBy;
    private String deletedBy;

    private String deletionReason; // optional: "resigned", "terminated", etc
}