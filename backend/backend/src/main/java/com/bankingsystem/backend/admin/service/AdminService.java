package com.bankingsystem.backend.admin.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.admin.dto.AdminLoginRequest;
import com.bankingsystem.backend.admin.dto.AdminLoginResponse;
import com.bankingsystem.backend.admin.entity.Admin;
import com.bankingsystem.backend.admin.repository.AdminRepository;
import com.bankingsystem.backend.auth.JwtUtil;
import com.bankingsystem.backend.common.service.AuditLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;

    public AdminLoginResponse login(AdminLoginRequest request, String ip) {

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    auditLogService.log(
                            request.getEmail(),
                            "ADMIN",
                            "LOGIN_FAILED_NOT_FOUND",
                            ip
                    );
                    return new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Admin not found"
                    );
                });

        // -------- Account inactive --------
        if (!admin.isActive()) {
            auditLogService.log(
                    admin.getEmail(),
                    admin.getRole(),
                    "LOGIN_BLOCKED_INACTIVE",
                    ip
            );
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Admin account is inactive"
            );
        }

        // -------- Wrong password --------
        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        )) {
            auditLogService.log(
                    admin.getEmail(),
                    admin.getRole(),
                    "LOGIN_FAILED_INVALID_PASSWORD",
                    ip
            );
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        // -------- Login success --------
        try {
            String token = jwtUtil.generateToken(
                    admin.getEmail(),
                    admin.getRole()
            );

            auditLogService.log(
                    admin.getEmail(),
                    admin.getRole(),
                    "LOGIN_SUCCESS",
                    ip
            );

            return new AdminLoginResponse(token, admin.getRole());

        } catch (Exception e) {
            e.printStackTrace();

            auditLogService.log(
                    admin.getEmail(),
                    admin.getRole(),
                    "TOKEN_GENERATION_FAILED",
                    ip
            );

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Token generation failed"
            );
        }
    }
}
