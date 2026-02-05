package com.bankingsystem.backend.card.dto;


import lombok.Data;

@Data
public class CardLimitsRequestDTO {
    private int perTxnLimit;
    private int dailyLimit;
}
