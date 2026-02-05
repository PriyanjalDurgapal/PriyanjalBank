package com.bankingsystem.backend.auth.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.bankingsystem.backend.auth.filter.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())

            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            .authorizeHttpRequests(auth -> auth
                // CORS preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                //  PUBLIC LOGIN ENDPOINTS
                .requestMatchers(HttpMethod.POST, "/api/admin/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/customer/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/forgot-password").permitAll()
                .requestMatchers(HttpMethod.POST,"/api/atm/**").permitAll()


                //  TOKEN + ROLE VERIFICATION
                .requestMatchers("/api/auth/verify").authenticated()

                //  ROLE-BASED ACCESS (ADDED)
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/staff-customers/**").hasRole("ADMIN")
                .requestMatchers("/api/customer/**").hasRole("CUSTOMER")

                // EVERYTHING ELSE NEEDS AUTH
                .anyRequest().authenticated()
            )

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
