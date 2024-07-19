package pl.server.server.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import pl.server.server.models.UserPreferences;

@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    
    public String generateToken(UserDetails userDetails, String userId, String email, String userRole,String username, String tokenType,UserPreferences userPrefs) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role",userRole);
        claims.put("email",email);
        claims.put("username",username);
        claims.put("userPrefs",userPrefs);
        return doGenerateToken(claims, userId, tokenType);
    }

    private String doGenerateToken(Map<String, Object> claims, String userId, String tokenType) {
        if(tokenType.equals("refreshToken")){
            expirationTime = 6000000; //100 minutes now. 24 hours = 86400000
        } else {
            expirationTime = 20000; // 
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
