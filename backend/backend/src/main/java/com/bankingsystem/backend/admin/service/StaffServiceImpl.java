package com.bankingsystem.backend.admin.service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.Staff.dto.CreateStaffRequest;
import com.bankingsystem.backend.Staff.dto.StaffResponse;
import com.bankingsystem.backend.Staff.dto.UpdateStaffRequest;
import com.bankingsystem.backend.Staff.entity.PreviousStaff;
import com.bankingsystem.backend.Staff.entity.Staff;
import com.bankingsystem.backend.admin.repository.PreviousStaffRepository;
import com.bankingsystem.backend.admin.repository.StaffadminRepository;
import com.bankingsystem.backend.common.util.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffServiceImpl implements StaffService {

    private final StaffadminRepository staffRepository;
    private final PreviousStaffRepository previousStaffRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    private final String uploadDir = "uploads/staff/";

    // ---------------- CREATE STAFF ----------------
    @Override
    public Staff createStaff(CreateStaffRequest request, MultipartFile photo, String createdBy) {

        if (staffRepository.existsByMobile(request.getMobile())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mobile already exists");
        }

        if (request.getEmail() != null && staffRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        String staffId = generateStaffId();
        String rawPassword = generateRandomPassword();
        String photoPath = null;

        try {
            if (photo != null && !photo.isEmpty()) {
                String basePath = System.getProperty("user.dir");
                String uploadPath = basePath + File.separator + "uploads" + File.separator + "staff";

                File directory = new File(uploadPath);
                if (!directory.exists()) directory.mkdirs();

                String fileName = staffId + "_" + photo.getOriginalFilename();
                File dest = new File(directory, fileName);
                photo.transferTo(dest);

                photoPath = "uploads/staff/" + fileName;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Photo upload failed: " + e.getMessage());
        }

        Staff staff = Staff.builder()
                .staffId(staffId)
                .fullName(request.getFullName())
                .dob(request.getDob())
                .gender(request.getGender())
                .maritalStatus(request.getMaritalStatus())
                .email(request.getEmail())
                .mobile(request.getMobile())
                .address(request.getAddress())
                .salary(request.getSalary())
                .workSchedule(request.getWorkSchedule())
                .manager(request.getManager())
                .notes(request.getNotes())
                .role(request.getRole())
                .photoPath(photoPath)
                .password(passwordEncoder.encode(rawPassword))
                .forcePasswordChange(true)
                .deleted(false)
                .createdAt(LocalDateTime.now())
                .createdBy(createdBy)
                .build();

        Staff saved = staffRepository.save(staff);

        // Email credentials
        try {
            if (saved.getEmail() != null) {
                emailService.sendMail(saved.getEmail(),
                        "Your Staff Account Credentials",
                        "Dear " + saved.getFullName() +
                                ",\n\nStaff ID: " + staffId +
                                "\nTemporary Password: " + rawPassword +
                                "\n\nPlease change password after login.");
            }
        } catch (Exception e) {
            System.err.println("Email sending failed for staff: " + saved.getId());
            e.printStackTrace();
        }

        return saved;
    }

    // ---------------- GET ALL STAFF ----------------
   @Override
public List<StaffResponse> getAllStaff() {
    return staffRepository.findAllByOrderByDeletedAscCreatedAtDesc()
            .stream()
            .map(staff -> StaffResponse.builder()
                    .id(staff.getId())
                    .staffId(staff.getStaffId())
                    .fullName(staff.getFullName())
                    .dob(staff.getDob())
                    .gender(staff.getGender())
                    .maritalStatus(staff.getMaritalStatus())
                    .email(staff.getEmail())
                    .mobile(staff.getMobile())
                    .address(staff.getAddress())
                    .salary(staff.getSalary())
                    .workSchedule(staff.getWorkSchedule())
                    .manager(staff.getManager())
                    .notes(staff.getNotes())
                    .role(staff.getRole())
                    .photoPath(staff.getPhotoPath())
                    .deleted(staff.isDeleted()) // important to mark inactive
                    .createdAt(staff.getCreatedAt())
                    .updatedAt(staff.getUpdatedAt())
                    .deletedAt(staff.getDeletedAt())
                    .createdBy(staff.getCreatedBy())
                    .updatedBy(staff.getUpdatedBy())
                    .deletedBy(staff.getDeletedBy())
                    .build())
            .toList();
}

    // ---------------- UPDATE STAFF ----------------
   @Override
public Staff updateStaff(Long id, UpdateStaffRequest request, String updatedBy) {

    // First find staff by ID only (ignore deleted condition)
    Staff staff = staffRepository.findById(id)
            .orElseThrow(() -> 
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));

    // Now check if inactive
    if (staff.isDeleted()) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Staff is inactive. Please make staff active first.");
    }

    // Update fields
    staff.setEmail(request.getEmail());
    staff.setMobile(request.getMobile());
    staff.setAddress(request.getAddress());
    staff.setManager(request.getManager());
    staff.setNotes(request.getNotes());
    staff.setMaritalStatus(request.getMaritalStatus());

    staff.setUpdatedAt(LocalDateTime.now());
    staff.setUpdatedBy(updatedBy);

    return staffRepository.save(staff);
}

    // ---------------- SOFT DELETE ----------------
    @Override
    public Staff softDeleteStaff(Long id, String deletedBy) {
        Staff staff = staffRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));

        staff.softDelete(deletedBy);
        return staffRepository.save(staff);
    }

    // ---------------- TOGGLE ACTIVE ----------------
    @Override
    public Staff toggleActiveStatus(Long id, String updatedBy) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));

        if (staff.isDeleted()) staff.restore(updatedBy);
        else staff.softDelete(updatedBy);

        return staffRepository.save(staff);
    }

    // ---------------- PERMANENT DELETE ----------------
    @Override
    public void permanentDeleteStaff(Long id, String deletedBy, String deletionReason) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Staff not found"));

        PreviousStaff previousStaff = PreviousStaff.builder()
                .staffId(staff.getStaffId())
                .fullName(staff.getFullName())
                .dob(staff.getDob())
                .gender(staff.getGender())
                .maritalStatus(staff.getMaritalStatus())
                .email(staff.getEmail())
                .mobile(staff.getMobile())
                .address(staff.getAddress())
                .salary(staff.getSalary())
                .workSchedule(staff.getWorkSchedule())
                .manager(staff.getManager())
                .notes(staff.getNotes())
                .role(staff.getRole())
                .photoPath(staff.getPhotoPath())
                .password(staff.getPassword())
                .createdAt(staff.getCreatedAt())
                .updatedAt(staff.getUpdatedAt())
                .deletedAt(LocalDateTime.now())
                .createdBy(staff.getCreatedBy())
                .updatedBy(staff.getUpdatedBy())
                .deletedBy(deletedBy)
                .deletionReason(deletionReason)
                .build();

        previousStaffRepository.save(previousStaff);
        staffRepository.delete(staff);
    }

    // ---------------- HELPERS ----------------
    private StaffResponse mapToResponse(Staff staff) {
        return StaffResponse.builder()
                .id(staff.getId())
                .staffId(staff.getStaffId())
                .fullName(staff.getFullName())
                .dob(staff.getDob())
                .gender(staff.getGender())
                .maritalStatus(staff.getMaritalStatus())
                .email(staff.getEmail())
                .mobile(staff.getMobile())
                .address(staff.getAddress())
                .salary(staff.getSalary())
                .workSchedule(staff.getWorkSchedule())
                .manager(staff.getManager())
                .notes(staff.getNotes())
                .role(staff.getRole())
                .photoPath(staff.getPhotoPath())
                .deleted(staff.isDeleted())
                .createdAt(staff.getCreatedAt())
                .updatedAt(staff.getUpdatedAt())
                .deletedAt(staff.getDeletedAt())
                .createdBy(staff.getCreatedBy())
                .updatedBy(staff.getUpdatedBy())
                .deletedBy(staff.getDeletedBy())
                .build();
    }

    private String generateStaffId() {
        return "STF" + System.currentTimeMillis();
    }

    private String generateRandomPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}