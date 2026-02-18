package com.bankingsystem.backend.admin.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bankingsystem.backend.admin.dto.AdminDashboardDTO;
import com.bankingsystem.backend.admin.entity.Account;
import com.bankingsystem.backend.admin.service.AdminAccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/see/accounts")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','STAFF')")
public class AdminAccountController {

    private final AdminAccountService service;

    /* ================= CREATE ACCOUNT ================= */

    @PostMapping("/create")
    public ResponseEntity<?> create(
            @RequestParam Long customerId,
            @RequestParam String type
    ) {
        try {
            Account account = service.create(customerId, type);
            return ResponseEntity.ok(account);
        } catch (RuntimeException ex) {
           
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ex.getMessage());
        }
    }

    /* ================= LIST CUSTOMER ACCOUNTS ================= */

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Account>> list(
            @PathVariable Long customerId
    ) {
        return ResponseEntity.ok(service.list(customerId));
    }

    /* ================= FREEZE ACCOUNT ================= */

    @PostMapping("/{id}/freeze")
    public ResponseEntity<?> freeze(@PathVariable Long id) {
        service.freeze(id);
        return ResponseEntity.ok("Account frozen successfully");
    }

    /* ================= UNFREEZE ACCOUNT ================= */

    @PostMapping("/{id}/unfreeze")
    public ResponseEntity<?> unfreeze(@PathVariable Long id) {
        service.unfreeze(id);
        return ResponseEntity.ok("Account unfrozen successfully");
    }

    /* ================= CLOSE ACCOUNT ================= */

    @DeleteMapping("/{id}")
    public ResponseEntity<?> close(@PathVariable Long id) {
        service.close(id);
        return ResponseEntity.ok("Account closed successfully");
    }


//  @GetMapping("/getallcustomernumber")
// public ResponseEntity<List<String>> getAllCustomerNumbers() {
//     List<String> numbers = adminAccountService.getAllAccountNumbers();
//     return ResponseEntity.ok(numbers);
// }


}
