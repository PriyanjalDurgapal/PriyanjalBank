package com.bankingsystem.backend.card.dto;

import com.bankingsystem.backend.card.enums.CardStatus;

import lombok.Data;

@Data
public class CardResponseDTO {

    private String id;
    private String maskedCardNumber;
    private String expiry;
    private CardStatus status;

    private boolean onlineEnabled;
    private boolean internationalEnabled;

    private int perTxnLimit;
    private int dailyLimit;
}
