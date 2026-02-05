// package com.bankingsystem.backend.scheduler;

// import java.time.LocalDate;

// import org.springframework.scheduling.annotation.Scheduled;
// import org.springframework.stereotype.Component;

// import com.bankingsystem.backend.card.enums.CardStatus;
// import com.bankingsystem.backend.card.repository.VirtualCardRepository;

// import lombok.RequiredArgsConstructor;

// @Component
// @RequiredArgsConstructor
// public class CardExpiryScheduler {

//     private final VirtualCardRepository repo;

//     @Scheduled(cron = "0 0 1 * * ?")
//     public void expireCards() {
//         repo.findAll().forEach(card -> {
//             if (card.getExpiryDate().isBefore(LocalDate.now())) {
//                 card.setStatus(CardStatus.EXPIRED);
//                 repo.save(card);
//             }
//         });
//     }
// }
