package pl.server.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.server.server.DTOs.ResetPasswordRequest;
import pl.server.server.models.PasswordResetToken;
import pl.server.server.models.User;
import pl.server.server.repositories.PasswordResetTokenRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    @Autowired
    PasswordResetTokenRepository resetTokenRepository;

    private UUID uuid = UUID.randomUUID();

    public List<PasswordResetToken> getAllToken(){
        return resetTokenRepository.findAll();
    }

    public Set<PasswordResetToken> getUserTokens(ResetPasswordRequest request,User user) {
        return user.getResetTokens();
    }

    public PasswordResetToken createPasswordResetToken(ResetPasswordRequest request, User user) {
        PasswordResetToken newToken = new
                PasswordResetToken(uuid.toString(), LocalDateTime.now(),user);
        resetTokenRepository.save(newToken);
        return newToken;
    }

    public void deletePasswordResetToken(String tokenId) {
        resetTokenRepository.deleteById(tokenId);
    }
}
