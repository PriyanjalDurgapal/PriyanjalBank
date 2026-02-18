package com.bankingsystem.backend.admin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankingsystem.backend.Staff.entity.Staff;

public interface StaffadminRepository extends JpaRepository<Staff, Long> {

    boolean existsByMobile(String mobile);

    boolean existsByEmail(String email);

    Optional<Staff> findByIdAndDeletedFalse(Long id);

    List<Staff> findByDeletedFalse();

    // NEW: fetch all staff (active + inactive)
    List<Staff> findAllByOrderByDeletedAscCreatedAtDesc();
}