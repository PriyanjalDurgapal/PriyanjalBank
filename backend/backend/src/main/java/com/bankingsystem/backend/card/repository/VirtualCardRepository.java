package com.bankingsystem.backend.card.repository;

import com.bankingsystem.backend.card.entity.VirtualCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VirtualCardRepository extends JpaRepository<VirtualCard, Long> {
    Optional<VirtualCard> findByCustomerRefId(Long customerRefId);
    Optional<VirtualCard> findByCustomerRefIdAndSoftDeletedFalse(Long customerRefId);

}
