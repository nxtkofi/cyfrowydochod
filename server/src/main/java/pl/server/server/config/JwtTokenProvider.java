package pl.server.server.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    
    public String generateToken(UserDetails userDetails, String userId, String email, String userRole, String tokenType) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role",userRole);
        claims.put("email",email);
        return doGenerateToken(claims, userId, tokenType);
    }

    private String doGenerateToken(Map<String, Object> claims, String userId, String tokenType) {
        if(tokenType.equals("refreshToken")){
            expirationTime = 86400000; //24 hours
        } else {
            expirationTime = 60000;
        }
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userId)                
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }        
}
