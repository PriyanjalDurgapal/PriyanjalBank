// package com.bankingsystem.backend.card.controller;

// import com.bankingsystem.backend.card.entity.VirtualCard;
// import com.bankingsystem.backend.card.service.CardOtpService;
// import com.bankingsystem.backend.card.service.CardService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/customer/card/reveal")
// @RequiredArgsConstructor
// public class CardRevealController {

//     private final CardService cardService;
//     private final CardOtpService otpService;

//     @PostMapping("/request-otp")
//     public void requestRevealOtp() {
//         VirtualCard card = cardService.getCard();
//         otpService.sendOtp(card, cardService.currentEmail(), "REVEAL_CARD");
//     }

//     @PostMapping
//     public String reveal(@RequestParam String otp) {
//         VirtualCard card = cardService.getCard();
//         otpService.verifyOtp(card, otp, "REVEAL_CARD");
//         return card.getCardNumber();
//     }
// }
