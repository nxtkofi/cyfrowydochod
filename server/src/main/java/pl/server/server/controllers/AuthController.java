package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import pl.server.server.DTOs.LoginRequest;
import pl.server.server.DTOs.RegistrationRequest;
import pl.server.server.services.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
        
    @Autowired
    private AuthService authService;   

    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        System.out.println("HALO");

        return authService.loginUser(loginRequest,response);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        return authService.registerUser(registrationRequest);
        }
    @GetMapping("/refresh")
    public ResponseEntity<String> refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("HALO");

        return authService.refreshAccessToken(request, response);
    }
    @GetMapping("/logout")
    public ResponseEntity logoutUser(HttpServletRequest request, HttpServletResponse response){
        System.out.println("LOGGING OUT ");

        return authService.handleLogOut(request, response);
    }
}

