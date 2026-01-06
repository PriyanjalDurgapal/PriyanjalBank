package com.bankingsystem.backend.auth;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // Make sure the secret is at least 32 characters (256 bits) for HS256
    private final String SECRET = "BANKING_SECRET_KEY_123_BANKING_SECRET_KEY_123"; 

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    private final long EXPIRATION = 1000 * 60 * 60; // 1 hour

    /* ===================== Generate JWT token ===================== */
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /* ===================== Extract claims from token ===================== */
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /* ===================== Extract email (subject) ===================== */
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    /* ===================== Extract role ===================== */
    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    /* ===================== Validate token expiration ===================== */
    public boolean isTokenValid(String token) {
        try {
            Claims claims = extractClaims(token);
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
