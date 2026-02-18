package com.bankingsystem.backend.Staff.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StaffLoginResponse {
    private String token;
    private String role;
    private boolean forcePasswordChange;
}