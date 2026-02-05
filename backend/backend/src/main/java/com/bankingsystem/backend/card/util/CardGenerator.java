package com.bankingsystem.backend.card.util;

import java.time.LocalDate;
import java.util.Random;

public class CardGenerator {

    public static String generateCardNumber() {
        return "4111" + (10000000 + new Random().nextInt(90000000));
    }

    public static String mask(String number) {
        return "**** **** **** " + number.substring(number.length() - 4);
    }

    public static String generateCvv() {
        return String.valueOf(100 + new Random().nextInt(900));
    }

    public static LocalDate expiry() {
        return LocalDate.now().plusYears(3);
    }
}
