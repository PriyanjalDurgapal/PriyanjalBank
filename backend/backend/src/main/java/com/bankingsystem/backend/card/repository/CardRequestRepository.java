package com.bankingsystem.backend.card.repository;

import com.bankingsystem.backend.card.entity.CardRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CardRequestRepository extends JpaRepository<CardRequest, Long> {

    boolean existsByCustomerRefIdAndStatus(Long customerRefId, CardRequest.Status status);

    Optional<CardRequest> findTopByCustomerRefIdOrderByCreatedAtDesc(Long customerRefId);

    List<CardRequest> findByStatus(CardRequest.Status status);
}
