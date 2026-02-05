package com.bankingsystem.backend.card.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.card.dto.VirtualCardResponse;
import com.bankingsystem.backend.card.entity.VirtualCard;
import com.bankingsystem.backend.card.mapper.VirtualCardMapper;
import com.bankingsystem.backend.card.repository.CardAuditLogRepository;
import com.bankingsystem.backend.card.service.CardOtpService;
import com.bankingsystem.backend.card.service.CardPinService;
import com.bankingsystem.backend.card.service.CardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customer/card")
@RequiredArgsConstructor
public class CustomerCardController {

    private final CardService cardService;
    private final CardOtpService otpService;
    private final CardPinService pinService;
    private final CardAuditLogRepository auditRepo;

    @PostMapping("/apply")
    public void apply() {
        cardService.applyForCard();
    }

    @GetMapping
    public VirtualCardResponse getCard() {
        VirtualCard card = cardService.getCard();
        return card == null ? null : VirtualCardMapper.toDto(card);
    }

    @PostMapping("/pin/request-otp")
public void requestPinOtp() {
    VirtualCard card = cardService.getCard();
    otpService.sendOtp(
        card,
        cardService.currentEmail(), // ✅ CORRECT EMAIL
        "SET_PIN"
    );
}

    @PostMapping("/pin/set")
    public void setPin(@RequestParam String otp, @RequestParam String pin) {
        VirtualCard card = cardService.getCard();
        otpService.verifyOtp(card, otp, "SET_PIN");
        pinService.setPin(card, pin);
    }

    @GetMapping("/logs")
    public List<?> logs() {
        VirtualCard card = cardService.getCard();
        return card == null ? List.of() : auditRepo.findByCardIdOrderByCreatedAtDesc(card.getId());
    }
   @PostMapping("/deactivate")
public void deactivate() {
    VirtualCard card = cardService.getCard();
    card.setActive(false);
    card.setSoftDeleted(true);
    cardService.save(card);
}

@PostMapping("/activate")
public void activate() {
    VirtualCard card = cardService.getCard();
    card.setActive(true);
    card.setSoftDeleted(false);
    cardService.save(card);
}


}
