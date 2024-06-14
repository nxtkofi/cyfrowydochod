package pl.server.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pl.server.server.models.User;
import pl.server.server.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    @Autowired
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

    
}
