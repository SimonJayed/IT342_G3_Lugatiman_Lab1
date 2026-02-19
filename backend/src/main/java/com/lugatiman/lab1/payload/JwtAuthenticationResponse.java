package com.lugatiman.lab1.payload;

import lombok.Data;

@Data
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private String email;
    private String name;

    public JwtAuthenticationResponse(String accessToken, String username, String email, String name) {
        this.accessToken = accessToken;
        this.username = username;
        this.email = email;
        this.name = name;
    }
}
