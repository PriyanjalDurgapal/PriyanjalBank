package com.bankingsystem.backend.admin.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity; 
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bankingsystem.backend.Staff.dto.CreateStaffRequest;
import com.bankingsystem.backend.Staff.dto.StaffResponse;
import com.bankingsystem.backend.Staff.dto.UpdateStaffRequest;
import com.bankingsystem.backend.Staff.entity.Staff;
import com.bankingsystem.backend.admin.service.StaffService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin-staff")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminStaffController {

    private final StaffService staffService;

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Staff> createStaff(
            @Valid @RequestPart("data") CreateStaffRequest request,
            @RequestPart(value = "photo", required = false) MultipartFile photo,
            Authentication authentication) {
        return ResponseEntity.ok(staffService.createStaff(request, photo, authentication.getName()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<StaffResponse>> getAllStaff() {
        return ResponseEntity.ok(staffService.getAllStaff());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStaffRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(staffService.updateStaff(id, request, authentication.getName()));
    }

    @PatchMapping("/toggle/{id}")
    public ResponseEntity<Staff> toggleActiveStatus(
            @PathVariable Long id,
            Authentication authentication) {
        return ResponseEntity.ok(staffService.toggleActiveStatus(id, authentication.getName()));
    }

    @DeleteMapping("/soft/{id}")
    public ResponseEntity<Void> softDeleteStaff(
            @PathVariable Long id,
            Authentication authentication) {
        staffService.softDeleteStaff(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/permanent/{id}")
    public ResponseEntity<Void> permanentDeleteStaff(
            @PathVariable Long id,
            @RequestParam(required = false) String reason,
            Authentication authentication) {
        staffService.permanentDeleteStaff(id, authentication.getName(), reason);
        return ResponseEntity.noContent().build();
    }
}