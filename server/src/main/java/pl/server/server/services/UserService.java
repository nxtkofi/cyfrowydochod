package pl.server.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static pl.server.server.config.SecurityConfig.verifyPassword;
import pl.server.server.models.User;
import pl.server.server.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        String encodedSaltedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedSaltedPassword);
        return userRepository.save(user);
    }

    public User loginUser(String email, String Password) {
        User user = userRepository.findByEmail(email);
        Boolean passwordsMatch = verifyPassword(Password, user.getPassword());
        if (passwordsMatch.equals(true)) {
            return user;
        } else {
            return null;
        }
    }
}
