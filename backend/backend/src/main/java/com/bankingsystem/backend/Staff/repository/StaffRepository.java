package com.bankingsystem.backend.Staff.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.bankingsystem.backend.Staff.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    Optional<Staff> findByStaffId(String staffId);

    Optional<Staff> findByEmail(String email);
    Optional<Staff> findByStaffIdAndDeletedFalse(String staffId);
}