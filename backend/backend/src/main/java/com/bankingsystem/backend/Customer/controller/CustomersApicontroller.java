package com.bankingsystem.backend.Customer.controller;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.Customer.dto.CustomerLoginRequest;
import com.bankingsystem.backend.Customer.dto.CustomerLoginResponse;
import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.service.CustomerApiServices;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomersApicontroller {

    private final CustomerApiServices customerApiServices;

    // ================= LOGIN (OPEN) =================
    @PostMapping("/login")
    public CustomerLoginResponse login(
            @RequestBody CustomerLoginRequest request,
            HttpServletRequest httpRequest
    ) {
        String ip = getClientIp(httpRequest);
        return customerApiServices.login(request, ip);
    }

    // ================= VERIFY TOKEN =================
    @PostMapping("/auth/verify")
    public void verifyToken() {
        // JWT filter validates token
    }

    // ================= GET PROFILE =================
    @GetMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    public Customer getProfile(Authentication auth) {
        String email = auth.getName(); // from JWT
        return customerApiServices.getProfileByEmail(email);
    }

    // ================= IP HELPER =================
    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0];
        }
        return request.getRemoteAddr();
    }
}
