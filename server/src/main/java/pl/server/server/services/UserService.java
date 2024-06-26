package pl.server.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;
import pl.server.server.config.JwtAuthenticationFilter;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.User;
import pl.server.server.repositories.UserRepository;

@Service
@Validated 
public class UserService {

    @Autowired
    AuthService authService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtAuthenticationFilter jwtAuth;

    public User registerUser(User user) {
        String encodedSaltedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedSaltedPassword);
        return userRepository.save(user);
    }
    
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody User updatedUser,
            HttpServletRequest request) {
    
        String newUserEmail = updatedUser.getEmail();
        Boolean passwordsMatch = authService.verifyUserPassword(updatedUser.getPassword(),id);
        if (passwordsMatch.equals(false)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Wrong password!");
        }
        String token = jwtAuth.extractTokenFromHeader(request);
        if (token == null || !jwtAuth.getUserIdFromToken(token).equals(id)) {            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        String ogUserEmail = userRepository.findById(id).orElse(null).getEmail();
        if(ogUserEmail==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if ( !ogUserEmail.equals(newUserEmail) && userRepository.findByEmail(newUserEmail) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email taken!");
        }

        User userToUpdate = userRepository.findById(id) 
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userToUpdate.setUserPreferences(updatedUser.getUserPreferences());                
        userToUpdate.setEmail(newUserEmail);
        userToUpdate.setUsername(updatedUser.getUsername());
        userToUpdate.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        userRepository.save(userToUpdate);
        return ResponseEntity.status(HttpStatus.OK).body("User updated!");
    }
    
}
