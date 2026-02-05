package com.bankingsystem.backend.card.controller;

import com.bankingsystem.backend.card.entity.VirtualCard;
import com.bankingsystem.backend.card.service.CardOtpService;
import com.bankingsystem.backend.card.service.CardPinService;
import com.bankingsystem.backend.card.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer/card/pin")
@RequiredArgsConstructor
public class CardPinController {

    private final CardService cardService;
    private final CardOtpService otpService;
    private final CardPinService pinService;

    @PostMapping("/forgot/request-otp")
    public void requestForgotOtp() {
        VirtualCard card = cardService.getCard();
        otpService.sendOtp(card, cardService.currentEmail(), "FORGOT_PIN");
    }

    @PostMapping("/forgot/reset")
    public void resetPin(
            @RequestParam String otp,
            @RequestParam String newPin
    ) {
        VirtualCard card = cardService.getCard();
        otpService.verifyOtp(card, otp, "FORGOT_PIN");
        pinService.resetPin(card, newPin);
    }
}
