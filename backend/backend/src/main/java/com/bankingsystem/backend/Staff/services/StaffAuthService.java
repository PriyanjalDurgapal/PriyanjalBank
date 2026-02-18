package com.bankingsystem.backend.Staff.services;



import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.Staff.dto.ChangePasswordRequest;
import com.bankingsystem.backend.Staff.dto.StaffLoginRequest;
import com.bankingsystem.backend.Staff.dto.StaffLoginResponse;
import com.bankingsystem.backend.Staff.entity.Staff;
import com.bankingsystem.backend.Staff.repository.StaffRepository;

import com.bankingsystem.backend.auth.JwtUtil;
import com.bankingsystem.backend.common.service.AuditLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StaffAuthService {

    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuditLogService auditLogService;

    public StaffLoginResponse login(StaffLoginRequest request, String ip) {

        // -------- Staff not found --------
        Staff staff = staffRepository.findByStaffId(request.getStaffId())
                .orElseThrow(() -> {
                    auditLogService.log(
                            request.getStaffId(),
                            "STAFF",
                            "LOGIN_FAILED_NOT_FOUND",
                            ip
                    );
                    return new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Staff ID not found"
                    );
                });

        // -------- Staff inactive --------
        if (staff.isDeleted()) {
            auditLogService.log(
                    staff.getEmail(),
                    staff.getRole(),
                    "LOGIN_BLOCKED_INACTIVE",
                    ip
            );
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Staff account is inactive. Contact administrator."
            );
        }

        // -------- Wrong password --------
        if (!passwordEncoder.matches(request.getPassword(), staff.getPassword())) {
            auditLogService.log(
                    staff.getEmail(),
                    staff.getRole(),
                    "LOGIN_FAILED_INVALID_PASSWORD",
                    ip
            );
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid Staff ID or Password"
            );
        }

        // -------- Generate token --------
        try {

            String token = jwtUtil.generateToken(
                    staff.getEmail(),
                    staff.getRole()
            );

            auditLogService.log(
                    staff.getEmail(),
                    staff.getRole(),
                    "LOGIN_SUCCESS",
                    ip
            );

            return new StaffLoginResponse(
                    token,
                    staff.getRole(),
                    staff.isForcePasswordChange()
                    
            );

        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Token generation failed"
            );
        }
    }
   public void changePassword(String email, ChangePasswordRequest request, String ip) {

    Staff staff = staffRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Staff not found"
            ));

    if (!passwordEncoder.matches(request.getOldPassword(), staff.getPassword())) {
        auditLogService.log(
                staff.getEmail(),
                staff.getRole(),
                "CHANGE_PASSWORD_FAILED_INVALID_OLD_PASSWORD",
                ip
        );
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Old password is incorrect"
        );
    }

    staff.setPassword(passwordEncoder.encode(request.getNewPassword()));
    staff.setForcePasswordChange(false);

    staffRepository.save(staff);

    auditLogService.log(
            staff.getEmail(),
            staff.getRole(),
            "CHANGE_PASSWORD_SUCCESS",
            ip
    );
}
}