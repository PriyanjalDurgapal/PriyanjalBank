package com.bankingsystem.backend.Staff.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class StaffResponse {

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

    private boolean deleted;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;

    private String createdBy;
    private String updatedBy;
    private String deletedBy;
}
