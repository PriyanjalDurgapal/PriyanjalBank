package com.bankingsystem.backend.Customer.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.admin.entity.Account;
import com.bankingsystem.backend.admin.repository.AccountRepository;
import com.bankingsystem.backend.card.entity.VirtualCard;
import com.bankingsystem.backend.card.repository.VirtualCardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardverifiactionPinService {

    private final AccountRepository accountRepository;
    private final VirtualCardRepository virtualCardRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public VirtualCard verifyPin(String accountNumber, String pin) {

        if (pin == null || pin.isBlank()) {
    throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST,
        "PIN is required"
    );
}


        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Account not found"
                        )
                );

        if (account.isFrozen() || account.isClosed()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Account is not active"
            );
        }

        VirtualCard card = virtualCardRepository
                .findByCustomerRefId(account.getCustomerId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Virtual card not found"
                        )
                );

        if (!card.isActive() || card.isLocked()) {
            throw new ResponseStatusException(
                    HttpStatus.LOCKED,
                    "Card is blocked"
            );
        }

        if (!passwordEncoder.matches(pin, card.getPinHash())) {

            card.setFailedPinAttempts(card.getFailedPinAttempts() + 1);

            if (card.getFailedPinAttempts() >= 3) {
                card.setLocked(true);
            }

            virtualCardRepository.save(card);

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid PIN"
            );
        }

        // ✅ Reset on success
        card.setFailedPinAttempts(0);
        virtualCardRepository.save(card);

        return card;
    }
}