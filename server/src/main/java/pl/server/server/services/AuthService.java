package pl.server.server.services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import pl.server.server.DTOs.LoginRequest;
import pl.server.server.DTOs.RegistrationRequest;
import pl.server.server.config.JwtAuthenticationFilter;
import pl.server.server.config.JwtTokenProvider;
import pl.server.server.models.User;
import pl.server.server.models.UserRole;
import pl.server.server.repositories.UserRepository;

@Service
@Validated
public class AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    public ResponseEntity<String> loginUser(LoginRequest loginRequest, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = (User) userRepository.findByEmail(loginRequest.getEmail());
    
            String jwtAccessToken = tokenProvider.generateToken(userDetails, user.getId(), user.getEmail(), user.getRole(), "accessToken");
            String jwtRefreshToken = tokenProvider.generateToken(userDetails, user.getId(), user.getEmail(), user.getRole(), "refreshToken");
            user.setRefreshToken(jwtRefreshToken);
            userRepository.save(user);
    
            Cookie refreshTokenCookie = new Cookie("refreshToken", jwtRefreshToken);
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setMaxAge(86400); // 1 day
            refreshTokenCookie.setSecure(false); // Use true in production with HTTPS
            refreshTokenCookie.setPath("/");
            response.addCookie(refreshTokenCookie);
    
            return ResponseEntity.ok(jwtAccessToken);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    public ResponseEntity<String> registerUser(@Valid RegistrationRequest registrationRequest) {
        UserRole userRole = new UserRole();

        @Size(min = 2, max = 20, message = "Username size is not between 2 and 20")
        String newUserUsername = registrationRequest.getUsername();
        @Size(min = 4, max = 30, message = "Password size is not between 4 and 30")
        String newUserPass = registrationRequest.getPassword();
        @Email
        String newUserEmail = registrationRequest.getEmail();

        if (userRepository.findByEmail(newUserEmail) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is taken!");
        }
        if (!userRepository.findByUsername(newUserUsername).isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is taken!");
        }
        User user = new User();
        user.setEmail(newUserEmail);
        user.setUsername(newUserUsername);
        user.setPassword(passwordEncoder.encode(newUserPass));
        user.setRole(userRole.getUserRole());
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    public ResponseEntity<String> refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
        
        try {
            String refreshToken = getRefreshTokenFromCookie(request);
            System.out.println(refreshToken);
            if (refreshToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token missing");
            }
    
            String userId = jwtAuthenticationFilter.getUserIdFromToken(refreshToken);
            User user = userRepository.findById(userId).orElse(null);
    
            if (user == null || !user.getRefreshToken().equals(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }
    
            if (jwtAuthenticationFilter.isTokenExpired(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token expired");
            }
    
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
            String newAccessToken = tokenProvider.generateToken(userDetails, user.getId(), user.getEmail(), user.getRole(), "accessToken");
    
            addTokenToCookie(response, "accessToken", newAccessToken, false);
            return ResponseEntity.ok("Token refreshed");
    
        } catch (Exception e) {
            System.err.println(e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }
    
    private String getRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
    
    private void addTokenToCookie(HttpServletResponse response, String name, String token, boolean httpOnly) {
        Cookie cookie = new Cookie(name, token);
        cookie.setHttpOnly(httpOnly);
        cookie.setMaxAge(86400); // 1 day
        cookie.setSecure(false); // Use true in production with HTTPS
        cookie.setPath("/");
        response.addCookie(cookie);
    }
}
