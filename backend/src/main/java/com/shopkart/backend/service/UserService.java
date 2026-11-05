
package com.shopkart.backend.service;

import com.shopkart.backend.entity.User;
import com.shopkart.backend.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISTER USER
    public User registerUser(User user) {

        String encodedPassword =
                passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    // LOGIN USER
    public User loginUser(String email, String password) {

        Optional<User> userOptional =
                userRepository.findByEmail(email);

        if (userOptional.isPresent()) {

            User user = userOptional.get();

            if (passwordEncoder.matches(
                    password,
                    user.getPassword())) {

                return user;
            }
        }

        throw new RuntimeException(
                "Invalid email or password"
        );
    }

    // GET USER BY EMAIL
    public Optional<User> getUserByEmail(String email) {

        return userRepository.findByEmail(email);
    }

    // GET ALL USERS
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // DELETE USER
    public void deleteUser(Long userId) {

        if (!userRepository.existsById(userId)) {

            throw new RuntimeException(
                    "User not found"
            );
        }

        userRepository.deleteById(userId);
    }
}
