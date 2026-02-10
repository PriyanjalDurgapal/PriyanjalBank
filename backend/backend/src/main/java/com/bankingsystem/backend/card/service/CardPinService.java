package com.bankingsystem.backend.card.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.bankingsystem.backend.admin.repository.AccountRepository;
import com.bankingsystem.backend.card.entity.VirtualCard;
import com.bankingsystem.backend.card.repository.VirtualCardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardPinService {

    private final VirtualCardRepository cardRepo;
      private final AccountRepository accountRepository;
    private final CardAuditService audit;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void setPin(VirtualCard card, String pin) {
        savePin(card, pin, "PIN_SET");
    }

    public void resetPin(VirtualCard card, String pin) {
        savePin(card, pin, "PIN_RESET");
    }

    private void savePin(VirtualCard card, String pin, String action) {
        card.setPinHash(encoder.encode(pin));
        card.setPinSet(true);
        card.setFailedPinAttempts(0);
        cardRepo.save(card);
        audit.log(card.getId(), action, "PIN updated");
    }
}
