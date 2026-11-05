
package com.shopkart.backend.controller;

import com.shopkart.backend.entity.User;
import com.shopkart.backend.service.UserService;
import com.shopkart.backend.service.JwtService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public UserController(
            UserService userService,
            PasswordEncoder passwordEncoder,
        JwtService jwtService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Convert User entity into a safe response
    private Map<String, Object> toUserResponse(User user) {
        Map<String, Object> response = new LinkedHashMap<>();

        response.put("userId", user.getUserId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("phone", user.getPhone());
        response.put("role", user.getRole());
        response.put("createdAt", user.getCreatedAt());

        return response;
    }

    // REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody User user) {

        User savedUser = userService.registerUser(user);

        return ResponseEntity.ok(toUserResponse(savedUser));
    }

   // LOGIN USER
@PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User user) {

    Optional<User> existingUser =
            userService.getUserByEmail(user.getEmail());

    if (existingUser.isPresent()) {
        User loggedInUser = existingUser.get();

        boolean passwordMatches = passwordEncoder.matches(
                user.getPassword(),
                loggedInUser.getPassword()
        );

        if (passwordMatches) {
            String token = jwtService.generateToken(loggedInUser);

            Map<String, Object> response =
                    toUserResponse(loggedInUser);

            response.put("token", token);

            return ResponseEntity.ok(response);
        }
    }

    return ResponseEntity
            .status(401)
            .body("Invalid email or password");
}

    // GET USER BY EMAIL
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(
            @PathVariable String email) {

        Optional<User> user = userService.getUserByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(toUserResponse(user.get()));
    }

    // GET ALL USERS
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {

        List<Map<String, Object>> users =
                userService.getAllUsers()
                        .stream()
                        .map(this::toUserResponse)
                        .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }

    // DELETE USER
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long userId) {

        userService.deleteUser(userId);

        return ResponseEntity.ok("User deleted successfully");
    }
}
