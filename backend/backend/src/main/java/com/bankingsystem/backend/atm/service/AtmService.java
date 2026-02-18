package com.bankingsystem.backend.atm.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.admin.entity.Account;
import com.bankingsystem.backend.admin.repository.AccountRepository;
import com.bankingsystem.backend.atm.entity.AtmBlock;
import com.bankingsystem.backend.atm.entity.AtmOtp;
import com.bankingsystem.backend.atm.entity.AtmTransaction;
import com.bankingsystem.backend.atm.enums.TransactionChannel;
import com.bankingsystem.backend.atm.enums.TransactionType;
import com.bankingsystem.backend.atm.repository.AtmBlockRepository;
import com.bankingsystem.backend.atm.repository.AtmOtpRepository;
import com.bankingsystem.backend.atm.repository.AtmTransactionRepository;
import com.bankingsystem.backend.card.entity.VirtualCard;
import com.bankingsystem.backend.card.repository.VirtualCardRepository;
import com.bankingsystem.backend.common.util.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AtmService {

    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;
    private final VirtualCardRepository virtualCardRepository;
    private final AtmOtpRepository atmOtpRepository;
    private final AtmBlockRepository atmBlockRepository;
    private final AtmTransactionRepository atmTransactionRepository;
    private final EmailService emailService;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    // ================= PIN VERIFICATION =================

    public void verifyPin(String accountNumber, String pin) {

        atmBlockRepository.findByAccountNumber(accountNumber)
                .filter(b -> b.getBlockedUntil().isAfter(LocalDateTime.now()))
                .ifPresent(b -> {
                    throw new ResponseStatusException(
                            HttpStatus.FORBIDDEN,
                            "ATM blocked for 24 hours"
                    );
                });

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Account not found"
                        )
                );

        Customer customer = customerRepository
                .findById(account.getCustomerId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Customer not found"
                        )
                );

        VirtualCard card = virtualCardRepository
                .findByCustomerRefId(account.getCustomerId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Virtual card not found"
                        )
                );

        if (!passwordEncoder.matches(pin, card.getPinHash())) {

            int attempts = card.getFailedPinAttempts() + 1;
            card.setFailedPinAttempts(attempts);
            virtualCardRepository.save(card);

            String maskedAccount = "XXXX" +
                    accountNumber.substring(accountNumber.length() - 3);

            if (attempts == 3) {
                emailService.sendMail(
                        customer.getEmail(),
                        "ATM SECURITY ALERT",
                        "3 wrong PIN attempts for account: " + accountNumber
                );
            }

            if (attempts >= 5) {
                atmBlockRepository.save(
                        AtmBlock.builder()
                                .accountNumber(accountNumber)
                                .blockedUntil(LocalDateTime.now().plusHours(24))
                                .build()
                );

                emailService.sendMail(
                        customer.getEmail(),
                        "ATM Blocked",
                        "Your ATM access for account "
                                + maskedAccount
                                + " has been blocked for 24 hours due to multiple incorrect PIN attempts."
                );

                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "ATM blocked for 24 hours"
                );
            }

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid PIN"
            );
        }

        card.setFailedPinAttempts(0);
        virtualCardRepository.save(card);
    }

    // ================= SEND OTP =================

    public void sendOtp(String accountNumber) {

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Account not found"
                        )
                );

        Customer customer = customerRepository
                .findById(account.getCustomerId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Customer not found"
                        )
                );

        String email = customer.getEmail();
        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Registered email not found"
            );
        }

        String otp = String.valueOf(
                100000 + new SecureRandom().nextInt(900000)
        );

        atmOtpRepository.save(
                AtmOtp.builder()
                        .accountNumber(accountNumber)
                        .otp(otp)
                        .attempts(0)
                        .used(false)
                        .createdAt(LocalDateTime.now())
                        .expiresAt(LocalDateTime.now().plusMinutes(10))
                        .build()
        );

        emailService.sendMail(
                email,
                "ATM OTP Verification",
                "Your ATM OTP is: " + otp +
                        "\n\nValid for 10 minutes.\nDo not share this OTP."
        );
    }

    // ================= TRANSACTION =================

    @Transactional
    public void processTransaction(
            String accountNumber,
            String otp,
            String type,
            double amount,
            TransactionChannel channel,
            String serviceProvider
    ) {

        AtmOtp atmOtp = atmOtpRepository
                .findByAccountNumberAndOtpAndUsedFalse(accountNumber, otp)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "Invalid OTP"
                        )
                );

        if (atmOtp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "OTP expired"
            );
        }

        atmOtp.setUsed(true);
        atmOtpRepository.save(atmOtp);

        Account account = accountRepository
                .findByAccountNumber(accountNumber)
                .orElseThrow();

       
        TransactionType transactionType;
        try {
            transactionType = TransactionType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid transaction type"
            );
        }

        
        if (transactionType == TransactionType.WITHDRAW
                && account.getBalance() < amount) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Insufficient balance"
            );
        }

        if (transactionType == TransactionType.DEPOSIT) {
            account.setBalance(account.getBalance() + amount);
        } else {
            account.setBalance(account.getBalance() - amount);
        }

        if (channel == null || serviceProvider == null) {
            channel = TransactionChannel.ATM_CARD;
            serviceProvider = "ATM_CARD";
        }

        accountRepository.save(account);

        atmTransactionRepository.save(
                AtmTransaction.builder()
                        .accountNumber(accountNumber)
                        .type(transactionType)
                        .amount(amount)
                        .balanceAfter(account.getBalance())
                        .channel(channel)
                        .serviceProvider(serviceProvider)
                        .createdAt(LocalDateTime.now())
                        .build()
        );

        sendTransactionAlert(account, type, amount);
    }

    // ================= VERIFY OTP =================

    public void verifyOtp(String accountNumber, String otp) {

        AtmOtp atmOtp = atmOtpRepository
                .findByAccountNumberAndOtpAndUsedFalse(accountNumber, otp)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "Invalid or already used OTP"
                        )
                );

        if (atmOtp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "OTP expired"
            );
        }
    }

    // ================= HELPER METHODS =================

    public void sendTransactionAlert(Account account, String type, double amount) {

        Customer customer = customerRepository
                .findById(account.getCustomerId())
                .orElseThrow();

        String maskedAccount = maskedAccountNumber(account.getAccountNumber());

        String message;

        if ("DEPOSIT".equalsIgnoreCase(type)) {
            message = "₹" + amount + " credited to your account "
                    + maskedAccount
                    + ". Available balance: ₹" + account.getBalance();
        } else {
            message = "₹" + amount + " debited from your account "
                    + maskedAccount
                    + ". Available balance: ₹" + account.getBalance();
        }

        emailService.sendMail(customer.getEmail(),
                "ATM Transaction Alert",
                message);
    }

    public String maskedAccountNumber(String accountNumber) {
        if (accountNumber.length() < 3) {
            return "XXXX";
        }
        String last3 = accountNumber.substring(accountNumber.length() - 3);
        return "XXX" + last3;
    }
}