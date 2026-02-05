package com.bankingsystem.backend.card.scheduler;

import com.bankingsystem.backend.card.entity.VirtualCard;
import com.bankingsystem.backend.card.repository.VirtualCardRepository;
import com.bankingsystem.backend.card.service.CardAuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardExpiryScheduler {

    private final VirtualCardRepository cardRepo;
    private final CardAuditService auditService;

    @Scheduled(cron = "0 0 0 * * ?") // every midnight
    public void expireCards() {
        List<VirtualCard> cards = cardRepo.findAll();

        cards.stream()
            .filter(card -> card.getExpiryDate().isBefore(LocalDate.now()))
            .filter(card -> !card.isLocked())
            .forEach(card -> {
                card.setLocked(true);
                cardRepo.save(card);
                auditService.log(card.getId(), "CARD_EXPIRED", "Card auto-expired");
            });
    }
}
