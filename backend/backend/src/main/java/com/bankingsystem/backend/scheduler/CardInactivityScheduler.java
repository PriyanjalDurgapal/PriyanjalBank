// package com.bankingsystem.backend.scheduler;

// import java.time.LocalDateTime;

// import org.springframework.scheduling.annotation.Scheduled;
// import org.springframework.stereotype.Component;

// import com.bankingsystem.backend.card.enums.CardStatus;
// import com.bankingsystem.backend.card.repository.VirtualCardRepository;

// import lombok.RequiredArgsConstructor;

// @Component
// @RequiredArgsConstructor
// public class CardInactivityScheduler {

//     private final VirtualCardRepository repo;

//     @Scheduled(cron = "0 0 2 * * ?")
//     public void freezeInactive() {
//         repo.findAll().forEach(card -> {
//             if (card.getLastUsedAt() != null &&
//                 card.getLastUsedAt()
//                     .isBefore(LocalDateTime.now().minusDays(90))) {
//                 card.setStatus(CardStatus.FROZEN);
//                 repo.save(card);
//             }
//         });
//     }
// }
