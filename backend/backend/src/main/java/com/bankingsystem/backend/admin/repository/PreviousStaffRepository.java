package com.bankingsystem.backend.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bankingsystem.backend.Staff.entity.PreviousStaff;

public interface PreviousStaffRepository extends JpaRepository<PreviousStaff, Long> {
}