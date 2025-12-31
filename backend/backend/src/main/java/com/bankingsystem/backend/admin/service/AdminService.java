package com.bankingsystem.backend.admin.service;

import com.bankingsystem.backend.admin.dto.AdminLoginRequest;
import com.bankingsystem.backend.admin.dto.AdminLoginResponse;
import com.bankingsystem.backend.admin.entity.Admin;
import com.bankingsystem.backend.admin.repository.AdminRepository;
import com.bankingsystem.backend.auth.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AdminLoginResponse login(AdminLoginRequest request) {

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.isActive()) {
            throw new RuntimeException("Admin is inactive");
        }

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(admin.getEmail(), admin.getRole());

        return new AdminLoginResponse(token, admin.getRole());
    }
}
