package com.lugatiman.lab1.controller;

import com.lugatiman.lab1.dto.LoginDto;
import com.lugatiman.lab1.dto.UserDto;
import com.lugatiman.lab1.entity.User;
import com.lugatiman.lab1.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private com.lugatiman.lab1.security.JwtTokenProvider tokenProvider;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto userDto) {
        try {
            User user = userService.registerUser(userDto);
            return new ResponseEntity<>(
                    new com.lugatiman.lab1.payload.ApiResponse(true, "User registered successfully", user),
                    HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(new com.lugatiman.lab1.payload.ApiResponse(false, e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDto loginDto) {
        System.out.println("DEBUG: Login endpoint hit for: " + loginDto.getUsernameOrEmail());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginDto.getUsernameOrEmail(),
                            loginDto.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken(authentication);

            User userDetails = userService.findByUsername(loginDto.getUsernameOrEmail())
                    .orElse(null);

            if (userDetails == null) {
                // Try by email if not found by username.
                // Note: findByUsername implementation in repo usually only checks username
                // column unless custom query.
                // For now, let's assume if authentication passed, we can find them.
                // If the input was email, we might need a findByEmail or findByUsernameOrEmail.
                // But strictly matching the authentication logic:
                String username = authentication.getName();
                userDetails = userService.findByUsername(username)
                        .orElseThrow(() -> new RuntimeException("User not found after authentication"));
            }

            return ResponseEntity.ok(new com.lugatiman.lab1.payload.JwtAuthenticationResponse(
                    jwt,
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    userDetails.getName()));
        } catch (org.springframework.security.core.AuthenticationException e) {
            return new ResponseEntity<>(
                    new com.lugatiman.lab1.payload.ApiResponse(false, "Authentication failed: " + e.getMessage()),
                    HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // Stateless logout (client-side clears token)
        return new ResponseEntity<>(new com.lugatiman.lab1.payload.ApiResponse(true, "Logged out successfully"),
                HttpStatus.OK);
    }
}
