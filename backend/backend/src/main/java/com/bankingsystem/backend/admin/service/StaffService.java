package com.bankingsystem.backend.admin.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.bankingsystem.backend.Staff.dto.CreateStaffRequest;
import com.bankingsystem.backend.Staff.dto.StaffResponse;
import com.bankingsystem.backend.Staff.dto.UpdateStaffRequest;
import com.bankingsystem.backend.Staff.entity.Staff;

public interface StaffService {

    Staff createStaff(CreateStaffRequest request, MultipartFile photo, String createdBy);

    List<StaffResponse> getAllStaff();

    Staff updateStaff(Long id, UpdateStaffRequest request, String updatedBy);

    Staff softDeleteStaff(Long id, String deletedBy); // Soft delete / toggle inactive

    Staff toggleActiveStatus(Long id, String updatedBy); // Restore or toggle inactive

    void permanentDeleteStaff(Long id, String deletedBy, String deletionReason); // Move to PreviousStaff
}