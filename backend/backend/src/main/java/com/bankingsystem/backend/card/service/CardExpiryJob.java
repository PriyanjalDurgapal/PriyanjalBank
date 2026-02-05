package com.bankingsystem.backend.card.service;


import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

import com.bankingsystem.backend.card.entity.VirtualCard;
import com.bankingsystem.backend.card.repository.VirtualCardRepository;

@Service
@RequiredArgsConstructor
public class CardExpiryJob {

    private final VirtualCardRepository repo;
    private final CardAuditService audit;

    @Scheduled(cron = "0 0 0 * * ?") // every midnight
    public void expireCards() {
        List<VirtualCard> cards = repo.findAll();

        cards.stream()
            .filter(card -> card.getExpiryDate().isBefore(LocalDate.now()))
            .filter(card -> !card.isLocked())
            .forEach(card -> {
                card.setLocked(true);
                repo.save(card);
                audit.log(card.getId(), "CARD_EXPIRED", "Card auto-expired");
            });
    }
}
