package pl.server.server.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenResponse {    

    public TokenResponse(String jwtRefreshToken, String jwtAccessToken) {
        this.accessToken =jwtAccessToken;
        this.refreshToken = jwtRefreshToken;
    }
    private String refreshToken;
    private String accessToken;
}
