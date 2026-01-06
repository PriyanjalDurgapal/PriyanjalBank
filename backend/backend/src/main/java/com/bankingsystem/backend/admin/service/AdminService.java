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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AdminLoginResponse login(AdminLoginRequest request) {
        
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Admin not found"
                        )
                );

        if (!admin.isActive()) {
            
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Admin account is inactive"
            );
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                admin.getPassword()
        )) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Invalid email or password"
            );
        }

        try {
    String token = jwtUtil.generateToken(admin.getEmail(), admin.getRole());
    return new AdminLoginResponse(token, admin.getRole());
} catch (Exception e) {
    e.printStackTrace();
    throw new ResponseStatusException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Token generation failed"
    );
}
    }
}
