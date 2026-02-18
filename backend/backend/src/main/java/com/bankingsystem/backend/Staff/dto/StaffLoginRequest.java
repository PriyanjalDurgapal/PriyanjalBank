package com.bankingsystem.backend.Staff.dto;

import lombok.Data;

@Data
public class StaffLoginRequest {
    private String staffId;
    private String password;
}