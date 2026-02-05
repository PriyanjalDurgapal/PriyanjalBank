package com.bankingsystem.backend.card.mapper;

import com.bankingsystem.backend.card.dto.VirtualCardResponse;
import com.bankingsystem.backend.card.entity.VirtualCard;

public class VirtualCardMapper {

    public static VirtualCardResponse toDto(VirtualCard card) {
        return VirtualCardResponse.builder()
            .id(card.getId())
            .maskedNumber(card.getMaskedNumber())
            .cvv(card.getCvv())
            .expiryMonth(card.getExpiryDate().getMonthValue())
            .expiryYear(card.getExpiryDate().getYear())
            .pinSet(card.isPinSet())
            .onlineEnabled(card.isOnlineEnabled())
            .internationalEnabled(card.isInternationalEnabled())
            .active(card.isActive())
            .dailyLimit(card.getDailyLimit())
            .build();
    }
}
