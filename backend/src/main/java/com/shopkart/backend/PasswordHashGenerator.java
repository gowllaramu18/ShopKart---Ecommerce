package com.shopkart.backend;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        String hash = encoder.encode("ShopKart@123");

        System.out.println("Password hash: " + hash);
        System.out.println("Hash length: " + hash.length());
    }
}