package com.bankingsystem.backend.card.service;

import java.time.LocalDateTime;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.card.entity.CardRequest;
import com.bankingsystem.backend.card.entity.VirtualCard;
import com.bankingsystem.backend.card.repository.CardRequestRepository;
import com.bankingsystem.backend.card.repository.VirtualCardRepository;
import com.bankingsystem.backend.card.util.CardGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CardService {

    private final VirtualCardRepository cardRepo;
    private final CardRequestRepository requestRepo;
    private final CustomerRepository customerRepo;
    private final CardAuditService audit;

    private Long customerId() {
        String email = (String) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return customerRepo.findByEmail(email).orElseThrow().getId();
    }
public String currentEmail() {
    return (String) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
}

    /* CUSTOMER */

    public void applyForCard() {
        Long cid = customerId();

        if (cardRepo.findByCustomerRefId(cid).isPresent())
            throw new RuntimeException("Card already exists");

        if (requestRepo.existsByCustomerRefIdAndStatus(cid, CardRequest.Status.PENDING))
            throw new RuntimeException("Request already pending");

        requestRepo.findTopByCustomerRefIdOrderByCreatedAtDesc(cid)
            .filter(r -> r.getStatus() == CardRequest.Status.REJECTED)
            .ifPresent(r -> {
                if (r.getDecisionAt().plusDays(15).isAfter(LocalDateTime.now()))
                    throw new RuntimeException("Reapply after 15 days");
            });

        requestRepo.save(CardRequest.builder().customerRefId(cid).build());
    }

    public VirtualCard getCard() {
        return cardRepo.findByCustomerRefId(customerId()).orElse(null);
    }
    public void save(VirtualCard card) {
    cardRepo.save(card);
}

    /* ADMIN */

    public void approve(Long requestId) {
        CardRequest req = requestRepo.findById(requestId).orElseThrow();

        String number = CardGenerator.generateCardNumber();

        VirtualCard card = cardRepo.save(
            VirtualCard.builder()
                .customerRefId(req.getCustomerRefId())
                .cardNumber(number)
                .maskedNumber(CardGenerator.mask(number))
                .cvv(CardGenerator.generateCvv())
                .expiryDate(CardGenerator.expiry())
                .onlineEnabled(true)
                .internationalEnabled(false)
                .dailyLimit(50000)
                .build()
        );

        req.setStatus(CardRequest.Status.APPROVED);
        req.setDecisionAt(LocalDateTime.now());
        requestRepo.save(req);

        audit.log(card.getId(), "CARD_CREATED", "Approved by admin");
    }

    public void reject(Long requestId, String reason) {
        CardRequest req = requestRepo.findById(requestId).orElseThrow();
        req.setStatus(CardRequest.Status.REJECTED);
        req.setDecisionAt(LocalDateTime.now());
        req.setRejectionReason(reason);
        requestRepo.save(req);
    }
}
