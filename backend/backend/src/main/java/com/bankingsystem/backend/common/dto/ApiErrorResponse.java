package com.bankingsystem.backend.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class ApiErrorResponse {

    private Instant timestamp;
    private int status;
    private String message;
    private String path;
}
