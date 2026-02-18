package com.bankingsystem.backend.Staff.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdateStaffRequest {

    // =========================
    // Contact Information (Editable)
    // =========================

    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile must be 10 digits")
    private String mobile;

    private String address;

    // =========================
    // Work Information (Editable)
    // =========================

    private String manager;

    private String notes;

    private String maritalStatus;
}
