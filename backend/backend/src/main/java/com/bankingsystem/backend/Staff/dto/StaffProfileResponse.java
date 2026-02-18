package com.bankingsystem.backend.Staff.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StaffProfileResponse {

    private String fullName;
    private String email;
    private String role;
    private String profileImage; 
    private Boolean forcePasswordChange;
    
}