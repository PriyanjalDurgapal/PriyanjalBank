package com.bankingsystem.backend.card.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VirtualCardResponse {
    private Long id;
    private String maskedNumber;
    private String cvv;
    private int expiryMonth;
    private int expiryYear;
    private boolean pinSet;
    private boolean onlineEnabled;
    private boolean internationalEnabled;
    private boolean active;
    private double dailyLimit;
}
