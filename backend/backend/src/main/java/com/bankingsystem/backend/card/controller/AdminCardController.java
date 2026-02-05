package com.bankingsystem.backend.card.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.card.entity.CardRequest;
import com.bankingsystem.backend.card.repository.CardRequestRepository;
import com.bankingsystem.backend.card.service.CardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/card")
@RequiredArgsConstructor
public class AdminCardController {

    private final CardRequestRepository requestRepo;
    private final CardService cardService;

    @GetMapping("/pending")
    public List<CardRequest> pending() {
        return requestRepo.findByStatus(CardRequest.Status.PENDING);
    }

    @PostMapping("/{id}/approve")
    public void approve(@PathVariable Long id) {
        cardService.approve(id);
    }

    @PostMapping("/{id}/reject")
    public void reject(
            @PathVariable Long id,
            @RequestParam String reason
    ) {
        cardService.reject(id, reason);
    }
}
