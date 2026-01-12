package com.bankingsystem.backend.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthVerifyController {

    @PostMapping("/verify")
    public ResponseEntity<?> verify(Authentication auth) {
        return ResponseEntity.ok().build();
    }
}
